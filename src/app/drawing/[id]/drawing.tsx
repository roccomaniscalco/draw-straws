"use client";

import { PARTYKIT_HOST } from "@/env";
import usePartySocket from "partysocket/react";

export function Drawing(props: { id: string }) {
  const ws = usePartySocket({
    // usePartySocket takes the same arguments as PartySocket.
    host: PARTYKIT_HOST, // or localhost:1999 in dev
    party: "drawing",
    room: props.id,

    // in addition, you can provide socket lifecycle event handlers
    // (equivalent to using ws.addEventListener in an effect hook)
    onOpen() {
      console.log("connected");
    },
    onMessage(e) {
      console.log("message", e.data);
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
