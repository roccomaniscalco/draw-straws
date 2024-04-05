import type * as Party from "partykit/server";
import { error, json, notFound, ok } from "./utils/responses";
import { z } from "zod";
import * as DRAWING from "@/party/drawing-schema";

export default class DrawingServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  async onConnect(connection: Party.Connection) {
    const searchParams = new URLSearchParams(connection.uri);
    const user = z.string().parse(searchParams.get("user"));

    const joinMessage = {
      type: "drawing-join",
      userId: connection.id,
      user,
    } satisfies DRAWING.JoinMessage;
    this.room.broadcast(JSON.stringify(joinMessage));
  }

  async onClose(connection: Party.Connection) {
    const searchParams = new URLSearchParams(connection.uri);
    const user = z.string().parse(searchParams.get("user"));

    const leaveMessage = {
      type: "drawing-leave",
      userId: connection.id,
      user,
    } satisfies DRAWING.LeaveMessage;
    this.room.broadcast(JSON.stringify(leaveMessage), [connection.id]);
  }

  async onRequest(req: Party.Request) {
    if (req.method === "POST") {
      const body = await req.json();
      const bodySchema = z.object({ topic: z.string() });
      const { topic } = bodySchema.parse(body);

      await this.room.storage.put("id", this.room.id);
      await this.room.storage.put("topic", topic);

      return ok();
    }

    if (req.method === "GET") {
      const topic = await this.room.storage.get<string>("topic");
      const id = await this.room.storage.get<string>("id");
      if (id && topic) {
        return json({ id, topic });
      }
      return notFound();
    }

    return error("Method not allowed", 405);
  }
}
