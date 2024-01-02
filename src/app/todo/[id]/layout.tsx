import { notFound } from "next/navigation";
import { Suspense } from "react";
import TodoHeader from "@/components/todo-header";
import TodoHeaderLoading from "@/components/todo-header/loading";
import { Separator } from "@/components/ui/separator";

export default function TodoPageLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const id = parseInt(params.id);
  if (isNaN(id)) return notFound();

  return (
    <>
      <Suspense fallback={<TodoHeaderLoading />}>
        <TodoHeader todoId={id} />
      </Suspense>
      <Separator className="mb-4 mt-3" />
      <div className="space-y-6 px-2">{children}</div>
    </>
  );
}
