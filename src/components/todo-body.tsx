import { type Todo } from "@/lib/schemas";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Separator } from "./ui/separator";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export const priorityColors = new Map<Todo["priority"], string>([
  ["LOW", "text-green-500"],
  ["MEDIUM", "text-amber-500"],
  ["HIGH", "text-red-500"],
  [undefined, "text-slate-300"],
]);

function TodoBodyH2({ children }: { children?: React.ReactNode }) {
  return <h2 className="text-lg font-medium">{children}</h2>;
}

export default function TodoBody({ todo }: { todo: Todo }) {
  return (
    <article className="space-y-4">
      <div className="flex items-center space-x-4">
        <section className="flex-1 space-y-2">
          <TodoBodyH2>Priority</TodoBodyH2>
          <p className={priorityColors.get(todo.priority)}>
            {todo.priority ? capitalizeFirstLetter(todo.priority) : "No"}{" "}
            Priority
          </p>
        </section>
        <Separator orientation="vertical" />
        <section className="flex-1 space-y-2">
          <TodoBodyH2>Due</TodoBodyH2>
          <p>{todo.due ? dayjs(todo.due).format("ddd, l") : "-"}</p>
        </section>
      </div>
      {todo.description && (
        <section className="space-y-2">
          <TodoBodyH2>Description</TodoBodyH2>
          <p className="rounded-lg border border-slate-200 px-2 py-1 leading-relaxed">
            {todo.description}
          </p>
        </section>
      )}
    </article>
  );
}
