'use server';

/**
 * @fileOverview This file defines the AI Campaign Generator flow.
 *
 * It takes a user's idea for a campaign and generates a title,
 * short description, long description, and a suggested funding goal.
 *
 * @exports {
 *   generateCampaign - The main function to generate a campaign.
 *   GenerateCampaignInput - The input type for generateCampaign.
 *   GenerateCampaignOutput - The output type for generateCampaign.
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCampaignInputSchema = z.object({
  idea: z.string().describe('The user\'s initial idea for the campaign.'),
});

export type GenerateCampaignInput = z.infer<typeof GenerateCampaignInputSchema>;

const GenerateCampaignOutputSchema = z.object({
  title: z.string().describe('A catchy and descriptive title for the campaign.'),
  description: z
    .string()
    .describe('A brief, compelling summary of the campaign (under 200 characters).'),
  longDescription: z
    .string()
    .describe(
      'A detailed and persuasive full description of the campaign (at least 100 characters).'
    ),
  goal: z.number().describe('A realistic and justified funding goal in ETH.'),
});

export type GenerateCampaignOutput = z.infer<typeof GenerateCampaignOutputSchema>;

export async function generateCampaign(
  input: GenerateCampaignInput
): Promise<GenerateCampaignOutput> {
  return generateCampaignFlow(input);
}

const generateCampaignPrompt = ai.definePrompt({
  name: 'generateCampaignPrompt',
  input: {schema: GenerateCampaignInputSchema},
  output: {schema: GenerateCampaignOutputSchema},
  prompt: `You are an expert crowdfunding campaign strategist. Your task is to take a user's idea and generate a complete, compelling, and ready-to-launch campaign.

The user's idea is: {{{idea}}}

Based on this idea, generate the following:
1.  **Title:** A catchy, memorable, and descriptive title.
2.  **Description:** A short, punchy summary (less than 200 characters) to grab attention.
3.  **Long Description:** A detailed, persuasive narrative (at least 100 characters) that tells the story behind the project, its goals, and its impact.
4.  **Goal:** A realistic funding goal denominated in ETH. Provide a brief justification for the amount you choose within the long description.

Focus on creating content that is clear, inspiring, and likely to attract backers.
Now, generate the campaign content based on the provided idea.
`,
});

const generateCampaignFlow = ai.defineFlow(
  {
    name: 'generateCampaignFlow',
    inputSchema: GenerateCampaignInputSchema,
    outputSchema: GenerateCampaignOutputSchema,
  },
  async input => {
    const {output} = await generateCampaignPrompt(input);
    return output!;
  }
);
