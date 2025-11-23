// src/components/quiz/ProblemCard.tsx

import React, { useState } from 'react';
import type { Problem } from '../../types/quiz'; // 타입 import
import AnswerBlock from './AnswerBlock';
import Button from '../Button';

interface ProblemCardProps {
  problem: Problem;
  problemNumber: number;
  onProblemSubmit: (problemId: string, isSubmitted: boolean) => void; // problemId type changed to string
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  problemNumber,
  onProblemSubmit,
}) => {
  // 1. 상태 관리: 제출 여부, 선택한 답
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedChoiceLabel, setSelectedChoiceLabel] = useState<string | null>(
    null
  ); // Store label instead of index
  const [inputValue, setInputValue] = useState('');

  // 2. 정답 여부 판별
  // 'short' 타입은 정답 확인 즉시 '정답'으로 간주
  // 'choice'는 선택한 답과 정답을 비교
  const isCorrect =
    problem.questionType === 'short'
      ? inputValue.trim().toLowerCase() ===
        problem.correctAnswer.trim().toLowerCase()
      : selectedChoiceLabel === problem.correctAnswer;

  // 3. 제출 핸들러
  const handleSubmit = () => {
    // 객관식인데 답을 선택하지 않았으면 경고
    if (problem.questionType === 'choice' && selectedChoiceLabel === null) {
      alert('답을 선택해주세요.');
      return;
    } else if (problem.questionType === 'short' && inputValue.trim() === '') {
      alert('답을 입력해주세요.');
      return;
    }
    setIsSubmitted(true);
    onProblemSubmit(problem._id, true); // Use problem._id
  };

  return (
    <div className="bg-card-background rounded-lg p-8 mb-6 border-2 border-edge shadow-lg">
      {/* 문제 헤더 */}
      <h3 className="text-xl font-bold  mb-4">
        문제 {problemNumber} -{' '}
        {problem.questionType === 'short' ? '주관식' : '객관식'}
      </h3>
      <p className="text-lg text-gray-300 mb-6">
        {problem.questionParts.map((part, index) => {
          if (part.type === 'highlight') {
            return (
              <span key={index} className="text-code-keyword ">
                {part.content}
              </span>
            );
          }
          return <span key={index}>{part.content}</span>;
        })}
      </p>

      {/* 문제 유형별 UI */}
      {problem.questionType === 'short' && (
        <textarea
          className="w-full bg-[#1E1E2E] border border-edge rounded-md p-4 text-secondary-text"
          rows={3}
          placeholder="정답을 입력하세요..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}

      {problem.questionType === 'choice' && (
        <div className="space-y-3">
          {problem.choices?.map((choice, index) => (
            <button
              key={index}
              onClick={() =>
                !isSubmitted && setSelectedChoiceLabel(choice.label)
              } // Use choice.label
              disabled={isSubmitted}
              className={`
                                        w-full text-left p-4 rounded-md border-1 transition-colors
                                        ${
                                          selectedChoiceLabel === choice.label
                                            ? 'border-accent-primary1 bg-accent-primary1/30' // 선택됨
                                            : 'border-edge bg-navigation '
                                        }
                                        ${
                                          isSubmitted
                                            ? 'opacity-70 cursor-not-allowed'
                                            : ''
                                        }
                                      `}
            >
              <span className="text-gray-200">
                {choice.label}) {choice.content}
              </span>{' '}
              {/* Display label and content */}
            </button>
          ))}
        </div>
      )}

      {/* 버튼 영역 */}
      <div className="mt-6 text-right">
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            variant="primary"
            className="bg-accent-primary1  font-bold py-2 px-6 rounded-full hover:bg-accent-primary1 transition-colors !w-auto !h-auto"
          >
            정답/해설 확인
          </Button>
        ) : isCorrect ? (
          <Button
            disabled
            variant="success"
            className="bg-accent-primary2  font-bold py-2 px-6 rounded-full cursor-default !w-auto !h-auto"
          >
            정답입니다! (10점 획득){' '}
            {/* Removed hardcoded points, could be added to problem data */}
          </Button>
        ) : (
          <Button
            disabled
            variant="danger"
            className="bg-accent-warning  font-bold py-2 px-6 rounded-full cursor-default !w-auto !h-auto"
          >
            오답입니다!
          </Button>
        )}
      </div>

      {/* 정답/해설 블록 (제출 시에만 보임) */}
      {isSubmitted && (
        <AnswerBlock
          answer={problem.correctAnswer}
          explanation={problem.explanation}
        />
      )}
    </div>
  );
};

export default ProblemCard;
