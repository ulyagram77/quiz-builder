export interface QuizListDto {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  questionsCount: number;
}

export interface QuizWithQuestionsDto {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  questions: QuestionDto[];
}

export interface QuestionDto {
  id: string;
  quizId: string;
  text: string;
  type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
  order: number;
  options: any;
  metadata: any;
  createdAt: string;
  updatedAt: string;
}
