import axios from 'axios';
import type {
  Problem,
  SingleProblemCheckResponse,
  AIExplanationResponse,
  UserAnswer,
} from '../types/quiz'; // Import new types

interface QuizApiResponse {
  success: boolean;
  data: {
    technique: {
      _id: string;
      slug: string;
      title: string;
      level: string;
      description: string;
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

  checkProblemAnswer: async (
    problemId: string,
    userAnswer: string
  ): Promise<SingleProblemCheckResponse> => {
    const response = await axios.post<SingleProblemCheckResponse>(
      `/api/theory/quiz/${problemId}/check`,
      { userAnswer }
    );
    console.log(problemId);
    console.log(userAnswer);
    return response.data;
  },

  generateAIExplanation: async (
    slug: string,
    userAnswers: UserAnswer[]
  ): Promise<AIExplanationResponse> => {
    const response = await axios.post<AIExplanationResponse>(
      `/api/theory/quiz/${slug}/result-explanation`,
      { userAnswers }
    );
    return response.data;
  },
};
