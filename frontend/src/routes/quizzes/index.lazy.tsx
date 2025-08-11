// src/routes/quizzes/index.lazy.tsx
import QuizzesTable from '@/components/quizzes-table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

export const Route = createLazyFileRoute('/quizzes/')({
  component: QuizzesPage,
  pendingComponent: QuizzesSkeleton,
});

function QuizzesPage() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Explore your quizzes</h1>
        <Button asChild>
          <Link to="/quizzes/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Quiz
          </Link>
        </Button>
      </div>
      <QuizzesTable />
    </section>
  );
}

function QuizzesSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="w-50" />
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-8" />
        ))}
      </div>
    </div>
  );
}
