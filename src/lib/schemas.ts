import { z } from "zod";

export const todoSchema = z.object({
  id: z.number().positive(),
  title: z.string().max(150),
  description: z.string(),
  is_completed: z.boolean().default(false),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  due: z.date().optional(),
});

export type Todo = z.infer<typeof todoSchema>;

export const formSchema = todoSchema.omit({ id: true, is_completed: true });
