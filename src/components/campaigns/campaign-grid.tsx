import type { Campaign } from '@/lib/placeholder-data';
import { CampaignCard } from './campaign-card';

type CampaignGridProps = {
  campaigns: Campaign[];
};

export function CampaignGrid({ campaigns }: CampaignGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
