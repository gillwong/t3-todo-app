import { Skeleton } from "../ui/skeleton";

export default function TodoListBodyLoading() {
  return (
    <div className="flex justify-between px-2 py-4">
      <div className="flex w-2/3 space-x-4">
        <Skeleton className="h-4 w-5" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex w-1/4 space-x-4">
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
