import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): TrpcContext {
  return {
    user: undefined,
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("persistent content procedures", () => {
  it("rejects invalid contact inquiry input before touching the database", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(
      caller.contact.submitInquiry({
        name: "A",
        email: "not-an-email",
        message: "short",
      }),
    ).rejects.toThrow();
  });

  it("returns the published project collection contract", async () => {
    const caller = appRouter.createCaller(createContext());
    const projects = await caller.projects.list();

    expect(Array.isArray(projects)).toBe(true);
  });
});
