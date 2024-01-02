import { type Todo } from "@/lib/schemas";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { capitalizeFirstLetter, cn } from "@/lib/utils";

export type PriorityIndicatorProps = {
  priority?: Todo["priority"];
};

export const priorityColors = new Map<Todo["priority"], string>([
  ["LOW", "bg-green-500"],
  ["MEDIUM", "bg-amber-500"],
  ["HIGH", "bg-red-500"],
  [undefined, "bg-slate-300"],
]);

export default function PriorityIndicator({
  priority,
}: PriorityIndicatorProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn("h-2 w-2 rounded-full", priorityColors.get(priority))}
          />
        </TooltipTrigger>
        <TooltipContent>
          {priority ? capitalizeFirstLetter(priority) : "No"} Priority
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
