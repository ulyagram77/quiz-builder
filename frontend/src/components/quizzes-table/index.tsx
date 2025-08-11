import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDeleteQuiz, useQuizzes } from '@/core/hooks/api/useQuizzes';
import type { QuizListDto } from '@/core/types/api-response.types';
import { Link, useNavigate } from '@tanstack/react-router';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const TABLE_COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'questions', label: 'Questions' },
  { key: 'created', label: 'Created' },
  { key: 'actions', label: 'Actions' },
] as const;

function TableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {TABLE_COLUMNS.map((column) => (
            <TableHead key={column.key}>{column.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-48" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-64" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-full mx-auto" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24 mx-auto" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-8 mx-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function QuizzesTable() {
  const navigate = useNavigate();
  const { data: quizzes, isLoading, error } = useQuizzes();
  const deleteQuizMutation = useDeleteQuiz();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    quiz: QuizListDto | null;
  }>({
    isOpen: false,
    quiz: null,
  });

  const handleRowClick = (quizId: string) => {
    navigate({ to: '/quizzes/$id', params: { id: quizId } });
  };

  const openDeleteDialog = (quiz: QuizListDto, event: React.MouseEvent) => {
    event.stopPropagation();
    setDeleteDialog({ isOpen: true, quiz });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ isOpen: false, quiz: null });
  };

  const handleDelete = async () => {
    if (!deleteDialog.quiz) return;

    try {
      await deleteQuizMutation.mutateAsync(deleteDialog.quiz.id);
      closeDeleteDialog();
    } catch (error) {
      console.error('Failed to delete quiz:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
        <TableSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <Button asChild>
            <Link to="/quizzes/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Quiz
            </Link>
          </Button>
        </div>
        <div className="flex justify-center py-8">
          <div className="text-red-500">
            Error loading quizzes:
            {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!quizzes || quizzes.length === 0 ? (
        <div className=" py-12">
          <div className="text-muted-foreground mb-4">No quizzes found</div>
          <Button asChild>
            <Link to="/quizzes/create">
              <Plus className="w-4 h-4 mr-2" />
              Create your first quiz
            </Link>
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {TABLE_COLUMNS.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizzes.map((quiz) => (
              <TableRow
                key={quiz.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(quiz.id)}
              >
                <TableCell className="font-medium">{quiz.title}</TableCell>
                <TableCell className="text-muted-foreground max-w-md truncate">
                  {quiz.description || 'No description'}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {quiz.questionsCount}{' '}
                    {quiz.questionsCount === 1 ? 'question' : 'questions'}
                  </span>
                </TableCell>
                <TableCell className=" text-muted-foreground">
                  {new Date(quiz.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => openDeleteDialog(quiz, e)}
                        disabled={deleteQuizMutation.isPending}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete quiz</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={deleteDialog.isOpen} onOpenChange={closeDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteDialog.quiz?.title}"? This
              action cannot be undone and will permanently remove the quiz and
              all its questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteQuizMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteQuizMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
