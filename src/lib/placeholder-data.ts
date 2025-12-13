import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

type CampaignStatus = 'active' | 'completed' | 'expired';

export type Campaign = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageId: string;
  goal: number;
  currency: 'ETH' | 'BTC';
  currentAmount: number;
  donors: number;
  endDate: string;
  status: CampaignStatus;
};

export const campaigns: Campaign[] = [
  {
    id: 'green-tech-innovators',
    title: 'Green Tech Innovators',
    description: 'Developing new technology for sustainable energy production and storage.',
    longDescription: 'Our project focuses on creating a breakthrough in battery technology using organic materials, reducing reliance on rare earth metals. This will make renewable energy more accessible and affordable for everyone. We have a working prototype and need funding for large-scale manufacturing.',
    imageId: 'img-green-tech',
    goal: 100,
    currency: 'ETH',
    currentAmount: 78,
    donors: 256,
    endDate: '2024-12-31',
    status: 'active',
  },
  {
    id: 'urban-art-revival',
    title: 'Urban Art Revival',
    description: 'Transforming public spaces with vibrant murals and art installations.',
    longDescription: 'We are a collective of artists dedicated to bringing color and life to neglected urban areas. This campaign will fund three large-scale murals in the city center, created in collaboration with local communities. Art has the power to inspire and unite people, and your contribution will make our city more beautiful.',
    imageId: 'img-community-art',
    goal: 0.5,
    currency: 'BTC',
    currentAmount: 0.45,
    donors: 102,
    endDate: '2024-11-20',
    status: 'active',
  },
  {
    id: 'decentralized-social-net',
    title: 'Decentralized Social Net',
    description: 'Building a censorship-resistant, open-source social media platform.',
    longDescription: 'Tired of centralized control and data harvesting? We are building a truly decentralized social network where users own their data and control their experience. The protocol is open-source and will be governed by its community. This funding will help us finalize the core protocol and launch the first client application.',
    imageId: 'img-open-source',
    goal: 250,
    currency: 'ETH',
    currentAmount: 150,
    donors: 1234,
    endDate: '2025-01-15',
    status: 'active',
  },
  {
    id: 'books-for-tomorrow',
    title: 'Books for Tomorrow',
    description: 'Providing digital and physical learning resources to underprivileged schools.',
    longDescription: 'Education is a right, not a privilege. Our goal is to equip 10 underfunded schools with a comprehensive library of e-books and physical textbooks. Your donation will directly fund the purchase and distribution of these essential learning materials, giving children the tools they need to succeed.',
    imageId: 'img-local-school',
    goal: 50,
    currency: 'ETH',
    currentAmount: 55,
    donors: 488,
    endDate: '2024-05-30',
    status: 'completed',
  },
    {
    id: 'safe-paws-shelter',
    title: 'SafePaws Animal Shelter',
    description: 'Expanding our shelter to rescue and care for more stray animals.',
    longDescription: 'Our current facility is at maximum capacity, and we have to turn away animals in need every day. This campaign will fund the construction of a new wing, allowing us to double our capacity. It will provide a safe and loving temporary home for animals until they find their forever families.',
    imageId: 'img-animal-shelter',
    goal: 2,
    currency: 'BTC',
    currentAmount: 1.8,
    donors: 350,
    endDate: '2024-10-31',
    status: 'active',
  },
  {
    id: 'cure-for-all-research',
    title: 'Cure-for-All Research',
    description: 'Funding independent research into rare genetic diseases.',
    longDescription: 'We are a team of scientists working on a novel gene-editing technique that has the potential to treat a range of rare genetic disorders. Traditional funding is slow and risk-averse. Crowdfunding allows us to accelerate our research and move towards clinical trials faster.',
    imageId: 'img-medical-research',
    goal: 500,
    currency: 'ETH',
    currentAmount: 512,
    donors: 890,
    endDate: '2024-06-15',
    status: 'completed',
  },
];

export const getImageById = (id: string): ImagePlaceholder | undefined => {
  return PlaceHolderImages.find(img => img.id === id);
};

export const getCampaignById = (id: string): Campaign | undefined => {
  return campaigns.find(campaign => campaign.id === id);
}
