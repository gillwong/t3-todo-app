"use client";
import { api } from "@/trpc/react";
import { notFound } from "next/navigation";
import TodoCheckbox from "../todo-checkbox";
import { todoSchema } from "@/lib/schemas";
import TodoHeaderLoading from "./loading";

export default function TodoHeader({ todoId }: { todoId: number }) {
  const { data: todo, isLoading } = api.todos.getById.useQuery(todoId);

  if (isLoading || todo === undefined) return <TodoHeaderLoading />;
  if (todo === null) return notFound();

  return (
    <div className="flex items-center space-x-4 px-2">
      <TodoCheckbox
        key="todo-header-checkbox"
        className="h-6 w-6"
        todo={todoSchema.parse(todo)}
      />
      <h1 className="flex-shrink text-lg font-semibold">{todo.title}</h1>
    </div>
  );
}
