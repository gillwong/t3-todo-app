import { notFound } from "next/navigation";
import { todoSchema } from "@/lib/schemas";
import EditTodoForm from "@/components/edit-todo-form";
import { api } from "@/trpc/server";

export default async function EditTodo({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) return notFound();

  const todo = await api.todos.getById.query(id);
  if (todo === null) return notFound();

  return <EditTodoForm todo={todoSchema.parse(todo)} />;
}
