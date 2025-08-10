import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/quizzes/')({
  component: QuizzesPage,
});

function QuizzesPage() {
  return <h1>Quizzes List</h1>;
}
