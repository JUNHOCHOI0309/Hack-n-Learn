// src/types/quiz.ts

export interface QuestionPart {
  type: 'highlight' | 'text';
  content: string;
}

export interface Choice {
  label: string;
  content: string;
}

export interface Problem {
  _id: string;
  techniqueId: string;
  rawQuestion: string;
  questionParts: QuestionPart[];
  choices?: Choice[]; // Optional for short answer types
  correctAnswer: string;
  explanation: string;
  questionType: 'short' | 'choice'; // 'input' from old type is 'short', 'multiple-choice' is 'choice'
}
