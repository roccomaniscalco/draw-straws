import { ShareButton } from "@/app/drawing/[id]/share-button";
import { Drawing } from "@/app/drawing/[id]/drawing";
import { PARTYKIT_URL } from "@/env";
import { z } from "zod";
import { JoinDrawingForm } from "@/app/drawing/[id]/join-drawing-form";
import { Cursors } from "@/app/drawing/[id]/cursors";

export default async function DrawingPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { user?: string };
}) {
  const res = await fetch(`${PARTYKIT_URL}/parties/drawing/${params.id}`, {
    next: { revalidate: 0 },
  }).then((res) => res.json());
  const resSchema = z.object({ topic: z.string() });
  const { topic } = resSchema.parse(res);

  return (
    <div className="flex w-full flex-col items-center gap-12">
      <h2 className="text-balance text-center text-2xl">{topic}</h2>
      {searchParams.user ? (
        <>
          <Drawing id={params.id} />
          <Cursors roomId={params.id} userId={searchParams.user} />
        </>
      ) : (
        <JoinDrawingForm />
      )}
      <ShareButton />
    </div>
  );
}
