"use client";

import { type Todo } from "@/lib/schemas";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";

export type TodoCheckboxProps = {
  className?: string;
  todo: Todo;
};

export default function TodoCheckbox({
  className,
  todo: tempTodo, // tempTodo can be out of date
}: TodoCheckboxProps) {
  const { data: todo, isSuccess } = api.todos.getById.useQuery(tempTodo.id);
  const [isCompleted, setIsCompleted] = useState(false);
  const updateTodo = api.todos.updateById.useMutation({
    onSuccess: (updatedTodo) => {
      setIsCompleted(updatedTodo.is_completed);
    },
  });

  useEffect(() => {
    let ignored = false;
    if (!ignored && isSuccess) {
      setIsCompleted(todo?.is_completed ?? false);
    }
    return () => {
      ignored = true;
    };
  }, [todo, isSuccess]);

  function handleClick() {
    updateTodo.mutate({
      ...tempTodo,
      is_completed: !(todo?.is_completed ?? false),
    });
  }

  return (
    <Checkbox
      id={tempTodo.id.toString()}
      className={className}
      checked={isCompleted}
      onClick={handleClick}
    />
  );
}
