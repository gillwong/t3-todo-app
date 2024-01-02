import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { todoSchema } from "@/lib/schemas";

const todosRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.todos.findMany();
  }),
  getById: publicProcedure
    .input(z.number().positive())
    .query(({ ctx, input }) => {
      return ctx.db.todos.findUnique({ where: { id: input } });
    }),
  updateById: publicProcedure.input(todoSchema).mutation(({ ctx, input }) => {
    return ctx.db.todos.update({
      where: { id: input.id },
      data: { ...input },
    });
  }),
  create: publicProcedure
    .input(todoSchema.omit({ id: true }))
    .mutation(({ ctx, input }) => {
      return ctx.db.todos.create({
        data: { ...input },
      });
    }),
  deleteById: publicProcedure
    .input(z.number().positive())
    .mutation(({ ctx, input }) => {
      return ctx.db.todos.delete({ where: { id: input } });
    }),
});

export default todosRouter;
