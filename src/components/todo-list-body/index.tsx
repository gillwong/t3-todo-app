import dayjs from "dayjs";
import { Fragment } from "react";
import { todoSchema } from "@/lib/schemas";
import { api } from "@/trpc/server";
import TodoListItem from "../todo-list-item";
import { Separator } from "../ui/separator";

export default async function TodoListBody({
  completed,
}: {
  completed?: boolean;
}) {
  const todos = await api.todos.getAll.query();

  const sortedTodos = [...todos].sort((a, b) => {
    if (!a.due && !b.due) return 0;
    if (!a.due) return 1;
    if (!b.due) return -1;
    return dayjs(a.due).isAfter(dayjs(b.due)) ? 1 : -1;
  });

  if (completed) {
    const completedTodos = sortedTodos.filter((todo) => todo.is_completed);
    return (
      <>
        {completedTodos.map((todo) => (
          <Fragment key={todo.id}>
            <TodoListItem todo={todoSchema.parse(todo)} />
            <Separator />
          </Fragment>
        ))}
      </>
    );
  }

  return (
    <>
      {sortedTodos.map((todo) => (
        <Fragment key={todo.id}>
          <TodoListItem todo={todoSchema.parse(todo)} />
          <Separator />
        </Fragment>
      ))}
    </>
  );
}
