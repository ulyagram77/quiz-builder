import { quizApi } from '@/core/api/quizzes.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const QUERY_KEYS = {
  quizzes: ['quizzes'] as const,
  quiz: (id: string) => ['quizzes', id] as const,
};

export function useQuizzes() {
  return useQuery({
    queryKey: QUERY_KEYS.quizzes,
    queryFn: quizApi.getQuizzes,
  });
}

export function useQuiz(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.quiz(id),
    queryFn: () => quizApi.getQuizById(id),
    enabled: !!id,
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: quizApi.deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.quizzes });
    },
  });
}
