"use client";

import { PARTYKIT_HOST } from "@/env";
import * as CURSORS from "@/party/cursors-schema";
import usePartySocket from "partysocket/react";
import { useEffect, useState } from "react";

export function Cursors(props: { roomId: string; user: string }) {
  const [cursors, setCursors] = useState<CURSORS.MoveMessage[]>([]);

  const ws = usePartySocket({
    host: PARTYKIT_HOST,
    party: "cursors",
    room: props.roomId,

    onMessage(event) {
      const message = CURSORS.messageSchema.parse(JSON.parse(event.data));
      switch (message.type) {
        case "cursors-move":
          setCursors([
            ...cursors.filter((c) => c.user !== message.user),
            message,
          ]);
          break;
        case "cursors-leave":
          setCursors(cursors.filter((c) => c.userId !== message.userId));
          break;
      }
    },
  });

  useEffect(() => {
    function cursorMove(e: MouseEvent) {
      const cursorMove = {
        type: "cursors-move",
        user: props.user,
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      } satisfies CURSORS.MoveMessage;
      ws.send(JSON.stringify(cursorMove));
    }

    window.addEventListener("mousemove", cursorMove);
    return () => window.removeEventListener("mousemove", cursorMove);
  }, [ws, props.user]);

  return cursors.map((cursor) => (
    <div
      key={cursor.userId}
      className="absolute rounded-full rounded-bl-none bg-green-700 px-2 py-1 text-white"
      style={{ top: `${cursor.y}%`, left: `${cursor.x}%` }}
    >
      {cursor.user}
    </div>
  ));
}
