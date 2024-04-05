"use client";

import { PARTYKIT_HOST } from "@/env";
import usePartySocket from "partysocket/react";
import * as DRAWING from "@/party/drawing-schema";
import { toast } from "sonner";
import { UserMinus, UserPlus } from "lucide-react";

export function Drawing(props: { id: string; user: string }) {
  const ws = usePartySocket({
    // usePartySocket takes the same arguments as PartySocket.
    host: PARTYKIT_HOST, // or localhost:1999 in dev
    party: "drawing",
    room: props.id,
    query: { user: props.user },

    // in addition, you can provide socket lifecycle event handlers
    // (equivalent to using ws.addEventListener in an effect hook)
    onOpen() {
      console.log("connected");
    },
    onMessage(event) {
      const message = DRAWING.messageSchema.parse(JSON.parse(event.data));
      switch (message.type) {
        case "drawing-join":
          toast(
            <div className="flex items-center">
              <UserPlus className="mr-3 h-5 w-5" />
              <p>
                <span className="font-bold">{message.user}</span> joined
              </p>
            </div>,
          );
          break;
        case "drawing-leave":
          toast(
            <div className="flex items-center">
              <UserMinus className="mr-3 h-5 w-5" />
              <p>
                <span className="font-bold">{message.user}</span> left
              </p>
            </div>,
          );
          break;
      }
    },
    onClose() {
      console.log("closed");
    },
    onError(e) {
      console.log("error");
    },
  });

  return <div></div>;
}
