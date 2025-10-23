import React from 'react';
import Button from './Button';

interface QuizQuestionProps {
  questionNumber: number;
  type: string;
  question: string;
  answer: string;
  explanation: string;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  questionNumber,
  type,
  question,
  answer,
  explanation,
}) => {
  return (
    <div className="bg-indigo-950 rounded-[10px] border-2 border-neutral-400 p-8 mb-8">
      <h3 className="text-white text-2xl font-bold font-['Noto_Sans_KR'] mb-4">
        문제 {questionNumber} — {type}
      </h3>
      <p className="text-pink-400 text-base font-normal font-['Cascadia_Code'] whitespace-pre-wrap mb-4">
        {question}
      </p>
      <div className="mb-4">
        <span className="text-white text-2xl font-bold font-['Noto_Sans_KR']">
          정답{' '}
        </span>
        <span className="text-white text-base font-normal font-['Noto_Sans_KR']">
          {answer}
        </span>
      </div>
      <div>
        <span className="text-white text-2xl font-bold font-['Noto_Sans_KR']">
          해설{' '}
        </span>
        <span className="text-white text-base font-normal font-['Noto_Sans_KR']">
          {explanation}
        </span>
      </div>
      {/* Placeholder for answer/explanation button */}
      <div className="mt-6 text-right">
        <Button
          variant="primary"
          className="px-6 py-3 text-xl font-semibold rounded-[20px]"
        >
          정답/해설 확인
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;
