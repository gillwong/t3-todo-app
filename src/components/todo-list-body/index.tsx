"use client";

import dayjs from "dayjs";
import { Fragment } from "react";
import { todoSchema } from "@/lib/schemas";
import { api } from "@/trpc/react";
import TodoListItem from "../todo-list-item";
import { Separator } from "../ui/separator";
import TodoListBodyLoading from "./loading";

export default function TodoListBody({ completed }: { completed?: boolean }) {
  const { data: todos, isLoading } = api.todos.getAll.useQuery();

  if (isLoading || todos === undefined) return <TodoListBodyLoading />;

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
