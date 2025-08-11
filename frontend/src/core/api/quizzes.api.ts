import type {
  QuizListDto,
  QuizWithQuestionsDto,
} from '../types/api-response.types';
import { API_ENDPOINTS, apiClient } from './api-client';

export const quizApi = {
  getQuizzes: (): Promise<QuizListDto[]> => {
    return apiClient.get<QuizListDto[]>(API_ENDPOINTS.QUIZZES);
  },

  getQuizById: (id: string): Promise<QuizWithQuestionsDto> => {
    return apiClient.get<QuizWithQuestionsDto>(API_ENDPOINTS.QUIZ(id));
  },

  createQuiz: (data: any): Promise<QuizWithQuestionsDto> => {
    return apiClient.post<QuizWithQuestionsDto>(API_ENDPOINTS.QUIZZES, data);
  },

  deleteQuiz: (id: string): Promise<QuizWithQuestionsDto> => {
    return apiClient.delete<QuizWithQuestionsDto>(API_ENDPOINTS.QUIZ(id));
  },
};
