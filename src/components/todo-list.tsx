import { Suspense, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import TodoListBody from "./todo-list-body";
import TodoListBodyLoading from "./todo-list-body/loading";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

export type TodoListProps = {
  completed?: boolean;
} & HTMLAttributes<HTMLUListElement>;

export default function TodoList({
  className,
  completed,
  ...props
}: TodoListProps) {
  return (
    <ul className={cn(className)} {...props}>
      <li className="flex justify-between p-2">
        <div className="flex items-center space-x-4">
          <Checkbox className="invisible" disabled />
          <p className="text-lg font-semibold text-black">Title</p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="me-3 text-lg font-semibold">Due</p>
        </div>
      </li>
      <Separator />
      <Suspense fallback={<TodoListBodyLoading />}>
        <TodoListBody completed={completed} />
      </Suspense>
    </ul>
  );
}
