import axios from 'axios';
import type { ProblemDetailApiResponse, ProblemSubmissionResponse, HintRequestResponse } from '../types/problem';

export const problemService = {
  getProblemDetail: async (slug: string): Promise<ProblemDetailApiResponse> => {
    const response = await axios.get<ProblemDetailApiResponse>(
      `/api/problems/${slug}`
    );
    return response.data;
  },

  submitProblemFlag: async (
    slug: string,
    flag: string
  ): Promise<ProblemSubmissionResponse> => {
    const response = await axios.post<ProblemSubmissionResponse>(
      `/api/problems/${slug}/submit`,
      { flag }
    );
    return response.data;
  },

  requestProblemHint: async (slug: string, stage: number): Promise<HintRequestResponse> => {
    const response = await axios.post<HintRequestResponse>(
      `/api/problems/${slug}/request-hint`,
      { stage }
    );
    return response.data;
  },
};

