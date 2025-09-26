export async function generateQuizItemsViaAI({ technique, limit = 3}){
        if(!technique) throw new Error("Technique not provided");

        return [
                {
                question: `${technique.title}의 가장 일반적인 원인은 무엇인가요?`,
                choices: ["입력값 검증 부족", "암호화 키 길이 부족", "로깅 과다"],
                correctAnswer: 0,
                explanation: "입력값 검증 미흡은 해당 공격의 핵심 원인입니다."
        },
        {
                question: `${technique.title} 방어책으로 가장 적절한 것은?`,
                choices: ["준비된 문장/파라미터 바인딩", "단순 키워드 필터", "404 리다이렉트"],
                correctAnswer: 0,
                explanation: "Prepared Statement/바인딩을 사용하세요."
        },
        {
                question: `${technique.title} 공격 탐지와 가장 거리가 먼 것은?`,
                choices: ["로그 분석", "WAF 규칙", "쿠키 삭제"],
                correctAnswer: 2,
                explanation: "쿠키 삭제는 직접적인 탐지 기법이 아닙니다."
        }
        ].slice(0, limit);
        }