import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { createContactInquiry, listPublishedProjects } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(({ ctx }) => ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  projects: router({
    list: publicProcedure.query(() => listPublishedProjects()),
  }),
  contact: router({
    submitInquiry: publicProcedure
      .input(z.object({
        name: z.string().trim().min(2).max(120),
        email: z.string().trim().email().max(320),
        message: z.string().trim().min(10).max(5000),
      }))
      .mutation(({ input }) => createContactInquiry(input)),
  }),
});

export type AppRouter = typeof appRouter;
