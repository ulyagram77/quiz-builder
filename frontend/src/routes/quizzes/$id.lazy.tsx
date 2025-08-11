import { Skeleton } from '@/components/ui/skeleton';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/quizzes/$id')({
  component: QuizzPage,
  pendingComponent: QuizzPageSkeleton,
});

function QuizzPage() {
  return (
    <section>
      <h1>Get Quiz by id</h1>
    </section>
  );
}

function QuizzPageSkeleton() {
  return (
    <div>
      <Skeleton className="h-7" />
    </div>
  );
}
