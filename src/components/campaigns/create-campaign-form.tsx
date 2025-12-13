"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { Rocket, Sparkles, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { generateCampaign } from "@/ai/flows/ai-campaign-generator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(100),
  description: z.string().min(20, "Short description must be at least 20 characters.").max(200),
  longDescription: z.string().min(100, "Full description must be at least 100 characters."),
  goal: z.coerce.number().positive("Goal must be a positive number."),
  currency: z.enum(["ETH", "BTC"]),
  endDate: z.date({
    required_error: "An end date is required.",
  }),
  idea: z.string().optional(),
});

export function CreateCampaignForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      longDescription: "",
      currency: "ETH",
      idea: "",
    },
  });

  async function handleGenerate() {
    const idea = form.getValues("idea");
    if (!idea || idea.length < 10) {
      toast({
        title: "Idea too short",
        description: "Please provide a more detailed idea for the AI to work with.",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateCampaign({ idea });
      form.setValue("title", result.title);
      form.setValue("description", result.description);
      form.setValue("longDescription", result.longDescription);
      form.setValue("goal", result.goal);
      toast({
        title: "Campaign Generated!",
        description: "The AI has populated the form with a draft. You can now review and edit it.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "The AI couldn't generate the campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Campaign Created! 🎉",
      description: "Your campaign is now live. Good luck!",
    });
    router.push('/');
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            <Card className="bg-card/50 border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  Generate with AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="idea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Idea</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., A decentralized platform for artists to sell their work as NFTs" {...field} />
                      </FormControl>
                      <FormDescription>
                        Describe your campaign idea in a sentence or two.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="button" onClick={handleGenerate} disabled={isGenerating} className="w-full">
                  {isGenerating ? "Generating..." : <><Sparkles className="mr-2"/>Generate Campaign Content</>}
                </Button>
              </CardFooter>
            </Card>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or fill manually
                </span>
              </div>
            </div>
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                CriptoFund charges a 5% platform fee on all successfully funded campaigns.
              </AlertDescription>
            </Alert>


            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., My Awesome Project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A brief, catchy summary of your campaign." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell the full story of your project..." {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Goal</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ETH">ETH (Ethereum)</SelectItem>
                        <SelectItem value="BTC">BTC (Bitcoin)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                   <FormControl>
                    <DatePicker date={field.value} setDate={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Submitting..." : <><Rocket className="mr-2"/>Launch Campaign</>}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
