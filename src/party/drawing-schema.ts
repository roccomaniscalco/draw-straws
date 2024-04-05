import { z } from "zod";

export const joinMessageSchema = z.object({
  type: z.literal("drawing-join"),
  userId: z.string(),
  user: z.string(),
});
export type JoinMessage = z.infer<typeof joinMessageSchema>;

export const leaveMessageSchema = z.object({
  type: z.literal("drawing-leave"),
  userId: z.string(),
  user: z.string(),
});
export type LeaveMessage = z.infer<typeof leaveMessageSchema>;

export const messageSchema = z.union([
  joinMessageSchema,
  leaveMessageSchema,
]);