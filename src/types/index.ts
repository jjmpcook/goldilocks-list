export interface Property {
  id: number;
  name: string;
  location: string;
  city: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  roomTypes: RoomType[];
  perks: string[];
  featured?: boolean;
}

export interface RoomType {
  id: number;
  name: string;
  description: string;
  capacity: number;
  bedType: string;
  price: number;
  image: string;
}

export interface City {
  id: number;
  name: string;
  image: string;
  description: string;
  properties: number;
}