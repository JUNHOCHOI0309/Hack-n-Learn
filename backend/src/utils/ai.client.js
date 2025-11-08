import dotenv from "dotenv";
import OPENAI from "openai";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) { console.warn("Warning: OPENAI_API_KEY is not set in environment variables."); }

const client = new OPENAI({ apiKey: OPENAI_API_KEY });

const isResponsesPreferred = (model) => /^gpt-4o(?!-chat)/.test(model || "");

/**
 * 일반 챗봇용 호출자
 * @param {Object} p
 * @param {Array<{role:'system'|'user'|'assistant', content:string}>} p.messages
 * @param {string} [p.model=process.env.CHAT_MODEL || 'gpt-5']
 * @param {number} [p.maxTokens=process.env.CHAT_MAX_TOKENS || 600]
 * @param {number} [p.temperature=1]
 * @returns {Promise<{text:string, model:string, usage?:{prompt:number, completion:number, total:number}}>}
 */

export async function chatCompletion({
        messages,
        model = process.env.CHAT_MODEL || "gpt-5",
        maxTokens = Number(process.env.CHAT_MAX_TOKENS) || 600,
        temperature = 1,
}) {
        const resp = await client.chat.completions.create({
                model,
                messages,
                temperature,
                max_completion_tokens: maxTokens,
        });

        const choice = resp?.choices?.[0]?.message?.content || "";
        const usage = resp?.usage ? {
                prompt: resp.usage.prompt_tokens ?? undefined,
                completion: resp.usage.completion_tokens ?? undefined,
                total: resp.usage.total_tokens ?? undefined,
        } : undefined;

        return {
                text: String(choice),
                model : resp?.model || model,
                usage,
        };
}

function maskSecrets(text) {
        if(!text) return text;
        const flagRegex = /\b(?:FLAG|CTF|flag|ctf)\{[^}]+\}/gi;
        let out = text.replace(flagRegex, "[REDACTED_FLAG]");
        out = out.replace(/\bsk-[A-Za-z0-9\-_]{16,}\b/g, "[REDACTED_KEY]");
        return out;
}

function extractJsonSubstring(s) {
        if(typeof s !== "string") return null;
        const first = s.indexOf("{");
        const last = s.lastIndexOf("}");
        if (first === -1 || last === -1 || last < first) return null;
        return s.slice(first, last + 1);
}

function sanitizeResult(r) {
  return {
    questionId: r?.questionId ?? null,
    reasonSummary: maskSecrets(r?.reasonSummary ?? null),
    mistakeAnalysis: Array.isArray(r?.mistakeAnalysis) ? r.mistakeAnalysis.map(maskSecrets) : [],
    stepByStepSolution: Array.isArray(r?.stepByStepSolution) ? r.stepByStepSolution.map(maskSecrets) : [],
    learningTips: r?.learningTips ?? null,
  };
}

function fallbackFromItem(it) {
  return {
    questionId: it.questionId ?? null,
    reasonSummary: null,
    mistakeAnalysis: [],
    stepByStepSolution: [],
    learningTips: null,
  };
}

function buildSystemPrompt(){
        return [
                {
                        role: "system",
                        content: [
                                "당신은 퀴즈 답안 분석 및 교육용 해설 전문 어시스턴트입니다.",
                                "반드시 단 하나의 JSON 객체만 반환하세요. 출력 외 어떤 텍스트도 금지합니다. 오직 JSON만.",
                                "최상위 키는 'results'이며, 배열입니다.",
                                "각 결과 객체는 questionId (string), isCorrect (boolean), correctAnswer (string), userAnswer (string), reasonSummary (string), mistakeAnalysis (배열 문자열), stepByStepSolution (배열 문자열), difficulty (string|null), confidence (string|null), learningTips (string), references (배열 문자열), explainLikeIm5 (string)를 반드시 포함해야 합니다.",
                                "reasonSummary, mistakeAnalysis 각 항목, stepByStepSolution 각 단계, learningTips, explainLikeIm5, references 설명 등은 모두 자연스러운 한국어 문장으로 작성하세요.",
                                "만약 필드에 해당 내용이 없으면 null 또는 빈 배열([])로 대체하세요.",
                                "출력 예시(샘플 JSON) : { \"results\": [{ \"questionId\": \"abc123\", \"isCorrect\": true, \"correctAnswer\": \"1\", \"userAnswer\": \"1\", \"reasonSummary\": \"...\", \"mistakeAnalysis\": [\"...\"]}] }",
                                "출력에 JSON 외 텍스트(설명, 마크다운 등)는 포함하지 마세요.",
                                "FLAG, 비밀값 등은 모두 '[REDACTED_FLAG]'로 대체하세요."
                        ].join(" "),
                },
        ];
}

function buildUserPrompt(payload) {
        return {
                role: "user",
                content: "아래 입력(JSON 배열)을 분석해서, 시스템 메시지에서 정의한 정확한 JSON 스키마로 **한국어** 결과를 반환하세요.\n\nInput:\n\n" + JSON.stringify(payload),
        };
}

export async function analyzeAnswersBatch({
        payload,
        model = process.env.EXPLAIN_MODEL || "gpt-5",
        timeoutMs = parseInt(process.env.EXPLAIN_TIMEOUT_MS) || 12000,
        maxRetries = 1,
}) {
        if(!payload || !Array.isArray(payload.items)){
                throw new Error("Invalid payload: expected { userId, items: [] }");
        }

        const batchMax = 10;
        const items = payload.items;
        const chunks = [];
        for(let i=0; i<items.length; i+=batchMax){
                chunks.push(items.slice(i, i+batchMax));
        }

        const aggregatedResults = [];

        for(const chunkItems of chunks){
                const chunkPayload = { userId: payload.userId, items: chunkItems };

                let attempt = 0;
                let parsed = null;

                while(attempt <= maxRetries){
                        attempt++;
                        const controller = new AbortController();
                        const timer = setTimeout(() => controller.abort(), timeoutMs);

                        try{
                                const messages = [
                                        ...buildSystemPrompt(),
                                        buildUserPrompt(chunkPayload),
                                ];
                                let text;
                                if(isResponsesPreferred(model)){
                                        const r = await client.responses.create({
                                                model,
                                                input: messages,
                                        });
                                        text = String(r.output_text ?? "");
                                } else {
                                        const r = await client.chat.completions.create({
                                                model,
                                                messages,
                                                temperature: 1,
                                                max_completion_tokens : Number(process.env.AI_MAX_TOKENS) || 1500,
                                                response_format: { type: "json_object" },
                                        });
                                        text = String(r.choices?.[0]?.message?.content ?? "");
                                }

                                clearTimeout(timer);

                                const candidate = extractJsonSubstring(text) ?? text;
                                const candidateMasked = maskSecrets(candidate);

                                try {
                                        const json = JSON.parse(candidateMasked);
                                        parsed = Array.isArray(json?.results) ? json : Array.isArray(json) ? { results: json } : null;
                                } catch(_){
                                        parsed = null;
                                }

                                if(parsed) {
                                        aggregatedResults.push(...parsed.results.map(sanitizeResult));
                                        break;
                                } else {
                                        console.warn("[AI][parse] JSON 파싱 실패. model=%s, len=%d, textSnippet=%s", model, candidateMasked?.length ?? 0, String(candidateMasked).slice(0, 200));
                                }
                        } catch (err) {
                                console.error("[AI] 호출 오류: ", err?.message || err);
                        } finally {
                                try { clearTimeout(timer); } catch {}
                        }
                }
                if(!parsed){
                        aggregatedResults.push(...chunkItems.map(fallbackFromItem));
                }
        }
        return { results: aggregatedResults };
}