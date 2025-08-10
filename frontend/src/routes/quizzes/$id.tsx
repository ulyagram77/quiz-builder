import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/quizzes/$id')({
  component: QuizzPage,
});

function QuizzPage() {
  return <h1>Get Quiz by id</h1>;
}
