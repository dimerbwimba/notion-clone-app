import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/5 dark:bg-neutral-600 ", className)}
      {...props}
    />
  )
}

export { Skeleton }
