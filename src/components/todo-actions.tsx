import { Edit } from "lucide-react";
import Link from "next/link";
import { type Todo } from "@/lib/schemas";
import TodoDeleteButton from "./todo-delete-button";
import { Button } from "./ui/button";

export default function TodoActions({ todo }: { todo: Todo }) {
  return (
    <div className="flex justify-between">
      <Button asChild>
        <Link href="/">Ok</Link>
      </Button>
      <div className="flex space-x-4">
        <TodoDeleteButton todo={todo} />
        <Button variant="secondary" asChild>
          <Link href={`/todo/${todo.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Link>
        </Button>
      </div>
    </div>
  );
}
