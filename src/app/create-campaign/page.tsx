import { CreateCampaignForm } from "@/components/campaigns/create-campaign-form";

export default function CreateCampaignPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline">Launch Your Project</h1>
        <p className="text-foreground/70 mt-2">Fill out the details below to get your campaign started.</p>
      </div>
      <CreateCampaignForm />
    </div>
  );
}
