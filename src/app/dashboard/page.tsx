import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from "lucide-react";
import { CampaignGrid } from "@/components/campaigns/campaign-grid";
import { Campaign } from "@/components/campaigns/campaign-card";

const userContributedCampaigns: Campaign[] = [
  {
    id: 'decentralized-ai-1',
    title: 'Project Gaia: Decentralized AI for Climate Change',
    description: 'An open-source AI model to analyze climate data and predict environmental impacts.',
    longDescription: 'Project Gaia aims to build a globally accessible, decentralized AI platform focused on climate change. By training our models on publicly available datasets, we can provide transparent and verifiable predictions for sea-level rise, deforestation, and extreme weather events, empowering communities and policymakers to take effective action.',
    imageId: 'img-ai-climate',
    goal: 150,
    currency: 'ETH',
    currentAmount: 95,
    donors: 450,
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Your Dashboard</h1>
        <p className="text-foreground/70 mt-2">Track your contributions and rewards.</p>
      </div>

      <Card className="w-full max-w-md mx-auto text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Your Vibe Coins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4">
            <Coins className="h-12 w-12 text-accent" />
            <p className="text-5xl font-bold text-primary">1,250</p>
          </div>
          <p className="text-sm text-foreground/60 mt-2">
            Earned from your contributions as a token of appreciation.
          </p>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-headline text-center">Your Contributions</h2>
        {userContributedCampaigns.length > 0 ? (
          <CampaignGrid campaigns={userContributedCampaigns} />
        ) : (
          <p className="text-center text-foreground/70">You haven't contributed to any campaigns yet.</p>
        )}
      </div>
    </div>
  );
}
