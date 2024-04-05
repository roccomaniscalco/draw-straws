import { ShareButton } from "@/app/drawing/[id]/share-button";
import { Drawing } from "@/app/drawing/[id]/drawing";
import { PARTYKIT_URL } from "@/env";
import { z } from "zod";

export default async function DrawingPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`${PARTYKIT_URL}/parties/drawing/${params.id}`, {
    next: { revalidate: 0 },
  });
  const resSchema = z.object({ topic: z.string() });
  const { topic } = resSchema.parse(await res.json());

  return (
    <>
      <h2 className="text-2xl pb-6">{topic}</h2>
      <ShareButton/>
      <Drawing id={params.id} />
    </>
  );
}
