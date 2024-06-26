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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  topic: z.string().min(1, { message: "Field is required." }),
});
export type CreateDrawingFormValues = z.infer<typeof formSchema>;

export function CreateDrawingForm(props: {
  onSubmit: (values: CreateDrawingFormValues) => Promise<void>;
}) {
  const form = useForm<CreateDrawingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Create Straw Drawing</CardTitle>
        <CardDescription>
          Can&apos;t decide who should do that unpleasant task? Draw straws to
          decide.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => props.onSubmit(values))}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What to decide</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Who's writing those unit tests?"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Create Drawing
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
