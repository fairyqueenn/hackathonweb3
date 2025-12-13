import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from "lucide-react";
import { CampaignGrid } from "@/components/campaigns/campaign-grid";
import { Campaign } from "@/components/campaigns/campaign-card";

const userContributedCampaigns: Campaign[] = [
  {
    id: 'sumatra-flood-1',
    title: 'Sumatra Flood Disaster Relief',
    description: 'Urgent aid needed for families affected by the devastating floods in Sumatra.',
    longDescription: 'Recent flash floods have displaced thousands of families in Sumatra, destroying homes and livelihoods. This fund will provide immediate relief including clean water, food, medical supplies, and temporary shelter. All transactions are transparently recorded on the blockchain.',
    imageId: 'img-sumatra-flood',
    goal: 50,
    currency: 'ETH',
    currentAmount: 18,
    donors: 320,
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
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
