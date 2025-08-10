import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/quizzes/create')({
  component: CreateQuizzPage,
});

function CreateQuizzPage() {
  return <h1>Create Quizz</h1>;
}
