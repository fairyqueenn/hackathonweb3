"use client";

import { useState } from 'react';
import Image from 'next/image';
import { getCampaignById, getImageById } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Clock, Gift } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BitcoinIcon } from '@/components/icons/bitcoin-icon';
import { EthereumIcon } from '@/components/icons/ethereum-icon';
import { useToast } from "@/hooks/use-toast"


export default function CampaignPage({ params }: { params: { id: string } }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const campaign = getCampaignById(params.id);
  if (!campaign) {
    notFound();
  }

  const image = getImageById(campaign.imageId);
  const progress = (campaign.currentAmount / campaign.goal) * 100;
  const daysLeft = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  const handleDonate = async () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }
    setIsProcessing(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsDialogOpen(false);
    toast({
      title: "Donation Successful!",
      description: `Thank you for your donation of ${donationAmount} ${campaign.currency}. You've earned Vibe Coins!`,
    });
    setDonationAmount('');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg">
            {image && (
              <Image
                src={image.imageUrl}
                alt={campaign.title}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                priority
              />
            )}
          </div>
        </div>
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">{campaign.currency}</Badge>
              <CardTitle className="text-3xl font-headline">{campaign.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Progress value={progress} className="h-3" />
                <p className="text-lg">
                  <span className="font-bold text-primary">{campaign.currentAmount.toLocaleString()} {campaign.currency}</span>
                  <span className="text-foreground/70"> raised of {campaign.goal.toLocaleString()} {campaign.currency}</span>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{progress.toFixed(0)}%</p>
                  <p className="text-sm text-foreground/70">Funded</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{campaign.donors.toLocaleString()}</p>
                  <p className="text-sm text-foreground/70">Donors</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{campaign.status === 'active' ? daysLeft : '0'}</p>
                  <p className="text-sm text-foreground/70">Days Left</p>
                </div>
              </div>
              <Button size="lg" className="w-full text-lg" onClick={() => setIsDialogOpen(true)} disabled={campaign.status !== 'active'}>
                <Gift className="mr-2" />
                {campaign.status === 'active' ? 'Donate Now' : 'Campaign Ended'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="prose dark:prose-invert max-w-none bg-card p-8 rounded-xl shadow-md">
        <h2 className="font-headline">About this campaign</h2>
        <p>{campaign.longDescription}</p>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline">Donate to {campaign.title}</DialogTitle>
            <DialogDescription>
              Your contribution will be processed securely on the blockchain.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount ({campaign.currency})
              </Label>
              <Input
                id="amount"
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="col-span-3"
                placeholder="0.1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full"
              onClick={handleDonate}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : (
                <>
                  {campaign.currency === 'ETH' ? <EthereumIcon className="mr-2 h-5 w-5" /> : <BitcoinIcon className="mr-2 h-5 w-5" />}
                  Confirm Donation
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
