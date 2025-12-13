import { AiAssistantForm } from "@/components/ai/ai-assistant-form";
import { Bot } from "lucide-react";

export default function AiAssistantPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8 bg-card p-6 rounded-lg shadow-md">
        <Bot className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline">AI Donation Assistant</h1>
        <p className="text-foreground/70 mt-2">
          Let our AI help you make an impact. Tell us your preferred causes and monthly budget, and we'll suggest a smart donation plan for you.
        </p>
      </div>
      <AiAssistantForm />
    </div>
  );
}
