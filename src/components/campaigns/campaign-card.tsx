import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// TODO: This type should be updated to match the structure of your Campaign smart contract
export type Campaign = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageId: string; // This might be an IPFS hash
  goal: number;
  currency: 'ETH' | 'BTC';
  currentAmount: number;
  donors: number;
  endDate: string; // This will likely be a timestamp from the contract
  status: 'active' | 'completed' | 'expired';
};


type CampaignCardProps = {
  campaign: Campaign;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.currentAmount / campaign.goal) * 100;
  
  // TODO: Image fetching will need to be adapted, potentially from IPFS
  const image = {
      imageUrl: `https://picsum.photos/seed/${campaign.id}/600/400`,
      imageHint: "campaign image"
  };

  return (
    <Link href={`/campaign/${campaign.id}`} className="block group">
      <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            {image && (
              <Image
                src={image.imageUrl}
                alt={campaign.title}
                fill
                className="object-cover rounded-t-lg"
                data-ai-hint={image.imageHint}
              />
            )}
            <div className="absolute top-2 right-2">
              {campaign.status === 'completed' && <Badge variant="secondary" className="bg-green-500/80 text-white">Completed</Badge>}
              {campaign.status === 'expired' && <Badge variant="destructive">Expired</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow p-4 space-y-3">
          <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">
            {campaign.title}
          </CardTitle>
          <p className="text-sm text-foreground/70 flex-grow">{campaign.description}</p>
          <div className="space-y-2 pt-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm font-medium text-foreground/80">
              <span>Raised: {campaign.currentAmount.toLocaleString()} {campaign.currency}</span>
              <span className="text-primary">{progress.toFixed(0)}%</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between text-sm text-foreground/60">
          <div className="flex items-center gap-2">
            <Target size={16} />
            <span>Goal: {campaign.goal.toLocaleString()} {campaign.currency}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{campaign.donors.toLocaleString()} Donors</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
