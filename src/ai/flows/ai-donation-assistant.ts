'use server';

/**
 * @fileOverview This file defines the AI Donation Assistant flow.
 *
 * It takes user preferences for donation causes and a monthly budget,
 * and automatically allocates donations each month according to those preferences.
 *
 * @exports {
 *   allocateDonations - The main function to allocate donations.
 *   AllocateDonationsInput - The input type for allocateDonations.
 *   AllocateDonationsOutput - The output type for allocateDonations.
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AllocateDonationsInputSchema = z.object({
  causes: z
    .string()
    .describe(
      'Preferred donation causes, separated by commas (e.g., environmental protection, education, healthcare)'
    ),
  monthlyBudget: z.number().describe('The total monthly budget for donations.'),
});

export type AllocateDonationsInput = z.infer<typeof AllocateDonationsInputSchema>;

const AllocateDonationsOutputSchema = z.object({
  allocationSummary: z
    .string()
    .describe(
      'A summary of how the donations are allocated across the specified causes, including amounts and percentages.'
    ),
});

export type AllocateDonationsOutput = z.infer<typeof AllocateDonationsOutputSchema>;

export async function allocateDonations(input: AllocateDonationsInput): Promise<AllocateDonationsOutput> {
  return allocateDonationsFlow(input);
}

const allocateDonationsPrompt = ai.definePrompt({
  name: 'allocateDonationsPrompt',
  input: {schema: AllocateDonationsInputSchema},
  output: {schema: AllocateDonationsOutputSchema},
  prompt: `You are an AI donation assistant. Your task is to allocate a user's monthly donation budget across their preferred causes.

  The user's preferred causes are: {{{causes}}}
  The user's monthly budget is: ${{{monthlyBudget}}}

  Provide a detailed allocation summary, including the amount allocated to each cause and the percentage of the total budget it represents.

  Example:
  Allocation Summary:
  - Environmental Protection: $50 (25%)
  - Education: $75 (37.5%)
  - Healthcare: $75 (37.5%)

  Make sure the total of donation allocation does not exceed the monthly budget and explain the reasoning behind your allocation.
  The allocation should be returned as a single paragraph.
  Now generate the donation allocation based on the provided input.
  `,
});

const allocateDonationsFlow = ai.defineFlow(
  {
    name: 'allocateDonationsFlow',
    inputSchema: AllocateDonationsInputSchema,
    outputSchema: AllocateDonationsOutputSchema,
  },
  async input => {
    const {output} = await allocateDonationsPrompt(input);
    return output!;
  }
);
