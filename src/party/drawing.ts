import type * as Party from "partykit/server";
import { error, json, notFound, ok } from "./utils/responses";
import { z } from "zod";

export default class DrawingServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

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
