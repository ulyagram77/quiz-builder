import CreateQuizzForm from '@/components/create-quizz-form';
import { Skeleton } from '@/components/ui/skeleton';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/quizzes/create')({
  component: CreateQuizzPage,
  pendingComponent: CreateQuizzSkeleton,
});

function CreateQuizzPage() {
  return (
    <section className="flex flex-col gap-8">
      <h1>Let`s create your first quizz</h1>
      <CreateQuizzForm />
    </section>
  );
}

function CreateQuizzSkeleton() {
  return (
    <div className="space-y-8 max-w-96">
      <Skeleton className="h-7" />
      <div className="space-y-2">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-10" />
        ))}
      </div>
    </div>
  );
}
