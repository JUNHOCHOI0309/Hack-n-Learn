import axios from 'axios';
import type { Problem } from '../types/quiz';

interface QuizApiResponse {
  success: boolean;
  data: {
    technique: {
      _id: string;
      slug: string;
      title: string;
      level: string;
      description: string;
      questionType: string;
    };
    quizzes: Problem[];
  };
}

export const quizService = {
  getQuizBySlug: async (slug: string): Promise<Problem[]> => {
    const response = await axios.get<QuizApiResponse>(
      `/api/theory/quiz/${slug}`
    );
    return response.data.data.quizzes;
  },
};
