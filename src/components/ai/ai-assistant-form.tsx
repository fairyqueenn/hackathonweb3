"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { allocateDonations } from "@/ai/flows/ai-donation-assistant";
import { Bot, PartyPopper } from "lucide-react";

const formSchema = z.object({
  causes: z.string().min(3, "Please enter at least one cause."),
  monthlyBudget: z.coerce.number().positive("Budget must be a positive number."),
});

export function AiAssistantForm() {
  const [allocation, setAllocation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      causes: "",
      monthlyBudget: 100,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAllocation(null);
    try {
      const result = await allocateDonations(values);
      setAllocation(result.allocationSummary);
    } catch (error) {
      console.error("Error getting allocation:", error);
      setAllocation("Sorry, I couldn't generate a plan right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Your Donation Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="causes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Causes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., environmental protection, education, healthcare"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyBudget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Budget ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Generating Plan..." : <><Bot className="mr-2 h-4 w-4" /> Generate Donation Plan</>}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {allocation && (
        <Card className="mt-8 animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PartyPopper className="text-primary"/>
              Your Personalized Donation Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90 whitespace-pre-line">{allocation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
