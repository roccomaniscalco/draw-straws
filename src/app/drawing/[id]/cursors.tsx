"use client";

import { PARTYKIT_HOST } from "@/env";
import * as CURSORS from "@/party/cursors-schema";
import { nanoid } from "nanoid";
import usePartySocket from "partysocket/react";
import { useEffect, useMemo, useState } from "react";

export function Cursors(props: { roomId: string; userId: string }) {
  const [cursors, setCursors] = useState<CURSORS.MoveMessage[]>([]);
  const cursorsWithId = useMemo(
    () => cursors.map((cursor) => ({ ...cursor, id: nanoid() })),
    [cursors],
  );

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
          setCursors(cursors.filter((c) => c.user !== message.user));
          break;
      }
    },
  });

  useEffect(() => {
    function cursorMove(e: MouseEvent) {
      const cursorMove = {
        type: "cursors-move",
        user: props.userId,
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      } satisfies CURSORS.MoveMessage;
      ws.send(JSON.stringify(cursorMove));
    }

    window.addEventListener("mousemove", cursorMove);
    return () => window.removeEventListener("mousemove", cursorMove);
  }, [ws, props.userId]);

  return cursorsWithId.map((cursor) => (
    <div
      key={cursor.id}
      className="absolute rounded-full rounded-bl-none bg-green-700 text-white py-1 px-2"
      style={{ top: `${cursor.y}%`, left: `${cursor.x}%` }}
    >
      {cursor.user}
    </div>
  ));
}
