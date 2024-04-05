import { Drawing } from "@/app/drawing/[id]/drawing";
import { PARTYKIT_URL } from "@/env";
import { z } from "zod";

export default async function DrawingPage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params.id);
  const res = await fetch(`${PARTYKIT_URL}/parties/drawing/${params.id}`, {
    next: { revalidate: 0 },
  });
  const resSchema = z.object({ topic: z.string() });
  const { topic } = resSchema.parse(await res.json());

  return (
    <div>
      <h2>{topic}</h2>
      <Drawing id={params.id} />
    </div>
  );
}
