import { cn } from '@/core/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md h-4', className)}
      {...props}
    />
  );
}

export { Skeleton };
