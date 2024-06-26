"use client";

import { ShareButton } from "@/app/drawing/[roomId]/share-button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  user: z
    .string()
    .min(1, { message: "Field is required" })
    .regex(
      // alphanumeric characters, underscores, and hyphens
      /^[a-zA-Z0-9_-]+$/,
      { message: "Field may not contain special characters." },
    ),
});
type FormValues = z.infer<typeof formSchema>;

export function JoinDrawingForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
    },
  });
  const router = useRouter();

  function onSubmit(values: FormValues) {
    router.push(`${location.pathname}/user/${values.user}`);
  }

  return (
    <Card className="h-fit w-full max-w-sm">
      <CardHeader>
        <CardTitle>Join Straw Drawing</CardTitle>
        <CardDescription>Enter your name to join!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => onSubmit(values))}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Qui-Gon Jinn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Join Drawing
            </Button>
          </form>
        </Form>
        <ShareButton />
      </CardContent>
    </Card>
  );
}
