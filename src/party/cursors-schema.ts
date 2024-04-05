import { z } from "zod";

export const moveMessageSchema = z.object({
  type: z.literal("cursors-move"),
  x: z.number(),
  y: z.number(),
  userId: z.string().optional(),
  user: z.string(),
});
export type MoveMessage = z.infer<typeof moveMessageSchema>;

export const leaveMessageSchema = z.object({
  type: z.literal("cursors-leave"),
  userId: z.string(),
});
export type LeaveMessage = z.infer<typeof leaveMessageSchema>;

export const messageSchema = z.union([
  moveMessageSchema,
  leaveMessageSchema,
]);
