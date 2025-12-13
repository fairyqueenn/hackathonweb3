import { CampaignGrid } from "@/components/campaigns/campaign-grid";
import { campaigns } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center bg-card p-8 rounded-xl shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
          Decentralized Crowdfunding for a Better Future
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Support innovative projects and transparent causes directly with cryptocurrency. Your contribution makes a real difference.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#campaigns">Explore Campaigns</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/create-campaign">
              <Rocket className="mr-2" /> Start a Campaign
            </Link>
          </Button>
        </div>
      </section>

      <section id="campaigns" className="space-y-6">
        <h2 className="text-3xl font-bold font-headline text-center">
          Active Campaigns
        </h2>
        <CampaignGrid campaigns={campaigns.filter(c => c.status === 'active')} />
      </section>

       <section id="completed-campaigns" className="space-y-6">
        <h2 className="text-3xl font-bold font-headline text-center">
          Successfully Funded
        </h2>
        <CampaignGrid campaigns={campaigns.filter(c => c.status === 'completed')} />
      </section>
    </div>
  );
}
