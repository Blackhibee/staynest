import type { Timestamp } from 'firebase/firestore';

export type UserRole = 'guest' | 'host' | 'admin';
export type OnboardingStatus = 'not_started' | 'in_progress' | 'completed';
export type PropertyStatus = 'draft' | 'pending' | 'approved' | 'rejected';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  profileImage: string;
  role: UserRole;
  phone?: string;
  hostBio?: string;
  preferredContact?: string;
  onboardingStatus: OnboardingStatus;
  createdAt: Timestamp;
}

export interface Property {
  id: string;
  hostId: string;
  name: string;
  description: string;
  location: string;
  propertyType: string;
  pricePerNight: number;
  cleaningFee: number;
  minimumStay: number;
  maximumStay: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  maxGuests: number;
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  status: PropertyStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  hostId: string;
  checkIn: Timestamp;
  checkOut: Timestamp;
  guests: number;
  numberOfNights: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  totalPrice: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  createdAt: Timestamp;
}
