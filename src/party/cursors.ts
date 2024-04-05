import type * as Party from "partykit/server";
import * as CURSORS from "./cursors-schema";

export default class CursorsServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  async onClose(connection: Party.Connection<unknown>) {
    const leaveMessage = {
      type: "cursors-leave",
      userId: connection.id,
    } satisfies CURSORS.LeaveMessage;
    this.room.broadcast(JSON.stringify(leaveMessage), [connection.id]);
  }

  async onMessage(stringifiedMessage: string, sender: Party.Connection) {
    const message = CURSORS.messageSchema.parse(JSON.parse(stringifiedMessage));
    switch (message.type) {
      case "cursors-move":
        message.userId = sender.id;
        this.room.broadcast(JSON.stringify(message), [sender.id]);
        break;
    }
  }
}
