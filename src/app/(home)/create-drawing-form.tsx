"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PARTYKIT_URL } from "@/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  topic: z.string().min(1),
});

export function ProfileForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const drawingId = 123;
    const res = await fetch(`${PARTYKIT_URL}/parties/drawing/${drawingId}`, {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (res.ok) {
      // redirect to drawing page
      router.push(`/drawing/${drawingId}`);
    }
  }

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Create Drawing</CardTitle>
        <CardDescription>
          Can&apos;t decide who should do that unpleasant task? Draw straws to
          decide.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you want to decide?</FormLabel>
                  <FormControl>
                    <Input placeholder="Who writes unit tests?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Start Drawing
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default function CreateRoomForm() {}
