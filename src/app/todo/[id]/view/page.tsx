import TodoActions from "@/components/todo-actions";
import TodoBody from "@/components/todo-body";
import { todoSchema } from "@/lib/schemas";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function ViewTodo({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) return notFound();

  const todo = await api.todos.getById.query(id);
  if (todo === null) return notFound();

  return (
    <>
      <TodoBody todo={todoSchema.parse(todo)} />
      <TodoActions todo={todoSchema.parse(todo)} />
    </>
  );
}
