import {
  CreateDrawingForm,
  CreateDrawingFormValues,
} from "@/app/(home)/create-drawing-form";
import { PARTYKIT_URL } from "@/env";
import { redirect } from "next/navigation";

export default function HomePage() {
  async function createDrawing(values: CreateDrawingFormValues) {
    "use server";
    const drawingId = 123;
    const res = await fetch(`${PARTYKIT_URL}/parties/drawing/${drawingId}`, {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (res.ok) {
      redirect(`/drawing/${drawingId}`);
    }
  }

  return <CreateDrawingForm onSubmit={createDrawing} />;
}
