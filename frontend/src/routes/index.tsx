import { logo } from '@/assets';
import { Button } from '@/components/ui/button';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <section className="flex flex-col gap-3">
      <h1>Welcome to the Quiz Builder!</h1>
      <p>Here you can create your own quizzes and descover them.</p>
      <div className="size-96 rounded-3xl overflow-clip">
        <img src={logo} alt="logo" className="size-full object-cover " />
      </div>
      <p>Here you can:</p>
      <div className="flex flex-col items-start">
        <Button variant="link" asChild>
          <Link to="/quizzes">Explore all quizzes</Link>
        </Button>
        <Button variant="link" asChild>
          <Link to="/quizzes/create">Create a new quiz</Link>
        </Button>
      </div>
    </section>
  );
}
