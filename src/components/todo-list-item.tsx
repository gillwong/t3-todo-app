import dayjs from "dayjs";
import Link from "next/link";
import { type HTMLAttributes } from "react";
import { type Todo } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import PriorityIndicator from "./priority-indicator";
import TodoCheckbox from "./todo-checkbox";

export type TodoListItemProps = { todo: Todo } & HTMLAttributes<HTMLLIElement>;

export default function TodoListItem({
  className,
  todo,
  ...props
}: TodoListItemProps) {
  return (
    <li
      className={cn("flex justify-between space-x-4 px-2 py-4", className)}
      {...props}
    >
      <div className="flex items-center space-x-4">
        <TodoCheckbox key="todo-list-item-checkbox" todo={todo} />
        <Link
          className="text-sm font-medium underline-offset-2 hover:underline"
          href={`/todo/${todo.id}/view`}
        >
          {todo.title}
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm">
          {todo.due ? dayjs(todo.due).format("D/MM") : "-"}
        </p>
        <PriorityIndicator priority={todo.priority} />
      </div>
    </li>
  );
}
