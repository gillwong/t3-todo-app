import { notFound } from "next/navigation";
import { todoSchema } from "@/lib/schemas";
import { api } from "@/trpc/server";
import TodoCheckbox from "../todo-checkbox";

export default async function TodoHeader({ todoId }: { todoId: number }) {
  const todo = await api.todos.getById.query(todoId);

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
