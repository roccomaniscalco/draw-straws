import { JoinDrawingForm } from "@/app/drawing/[roomId]/join-drawing-form";
import { PARTYKIT_URL } from "@/env";
import { z } from "zod";

export default async function JoinDrawingPage({
  params,
}: {
  params: { roomId: string };
}) {
  const res = await fetch(`${PARTYKIT_URL}/parties/drawing/${params.roomId}`, {
    next: { revalidate: 0 },
  }).then((res) => res.json());
  const resSchema = z.object({ topic: z.string() });
  const { topic } = resSchema.parse(res);

  return (
    <div className="container flex h-screen flex-col items-center">
      <div className="flex flex-1 items-center">
        <h2 className="items-center text-balance py-12 text-center text-4xl">
          {topic}
        </h2>
      </div>
      <JoinDrawingForm />
      <div className="flex-1" />
    </div>
  );
}
