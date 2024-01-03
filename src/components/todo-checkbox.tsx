"use client";

import { useEffect, useState } from "react";
import { type Todo } from "@/lib/schemas";
import { api } from "@/trpc/react";
import { Checkbox } from "./ui/checkbox";

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
    setIsCompleted((prev) => !prev);
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
