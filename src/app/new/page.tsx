import NewTodoForm from "@/components/new-todo-form";
import { Separator } from "@/components/ui/separator";

export default function NewPage() {
  return (
    <>
      <h1 className="text-lg font-bold">Create a New Todo</h1>
      <Separator className="my-3" />
      <NewTodoForm />
    </>
  );
}
