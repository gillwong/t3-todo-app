import { z } from "zod";

export const todoSchema = z.object({
  id: z.number().positive(),
  title: z.string().max(150),
  description: z.string(),
  is_completed: z.boolean().default(false),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).nullish(),
  due: z.date().nullish(),
});

export type Todo = z.infer<typeof todoSchema>;

export const formSchema = todoSchema.omit({ id: true, is_completed: true });
