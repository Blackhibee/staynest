export interface HomeListing {
  id: string;
  name: string;
  location: string;
  type: string;
  price: number;
  rating: number;
  image: string;
  tag: string;
}

export const homeListings: HomeListing[] = [
  {
    id: 'lagos-1',
    name: 'Ocean View Residence',
    location: 'Lekki Phase 1, Lagos',
    type: 'Apartment',
    price: 180,
    rating: 4.9,
    tag: 'Swimming pool',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'lagos-2',
    name: 'Bungalow by the Coast',
    location: 'Victoria Island, Lagos',
    type: 'Villa',
    price: 210,
    rating: 4.8,
    tag: 'Beachfront',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'lagos-3',
    name: 'Palm Crest Residence',
    location: 'Ikoyi, Lagos',
    type: 'Penthouse',
    price: 240,
    rating: 4.9,
    tag: 'Guest favourite',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'abuja-1',
    name: 'Garden Loft',
    location: 'Wuse, Abuja',
    type: 'Loft',
    price: 150,
    rating: 4.8,
    tag: 'Workspace',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ibadan-1',
    name: 'City Courtyard Villa',
    location: 'Mokola, Ibadan',
    type: 'Villa',
    price: 130,
    rating: 4.7,
    tag: 'Quiet courtyard',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ilorin-1',
    name: 'Harmony GRA Residence',
    location: 'GRA, Ilorin',
    type: 'Apartment',
    price: 125,
    rating: 4.8,
    tag: 'Serviced stay',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
  },
];

export const destinationCards = [
  { name: 'Lagos', count: '12 stays', state: 'Lagos', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80' },
  { name: 'Abuja', count: '9 stays', state: 'Abuja', image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80' },
  { name: 'Ibadan', count: '7 stays', state: 'Ibadan', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
  { name: 'Port Harcourt', count: '8 stays', state: 'Port Harcourt', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80' },
];
