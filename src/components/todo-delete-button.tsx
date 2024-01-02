"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { type Todo } from "@/lib/schemas";
import { api } from "@/trpc/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export default function TodoDeleteButton({ todo }: { todo: Todo }) {
  const router = useRouter();
  const { toast } = useToast();
  const deleteTodo = api.todos.deleteById.useMutation();

  async function handleDelete() {
    try {
      await deleteTodo.mutateAsync(todo.id);
      router.push("/");
      toast({ description: "Todo deleted successfully!" });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to delete todo. Please try again.",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive/90 hover:text-destructive-foreground"
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Todo?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} asChild>
            <AlertDialogAction>Delete</AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
