import { City } from '../types';

export const cities: City[] = [
  {
    id: 1,
    name: "San Francisco",
    image: "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg",
    description: "Iconic hills, Golden Gate Bridge views, and family-friendly neighborhoods with boutique hotels perfect for exploring the city.",
    properties: 32
  },
  {
    id: 2,
    name: "New York",
    image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg",
    description: "The city that never sleeps offers world-class museums, Broadway shows, and spacious family suites in the heart of Manhattan.",
    properties: 28
  },
  {
    id: 3,
    name: "London",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
    description: "Historic charm meets modern luxury with family-friendly hotels near iconic landmarks and royal parks.",
    properties: 24
  },
  {
    id: 4,
    name: "Tokyo",
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
    description: "Experience Japanese hospitality and culture with family accommodations that blend traditional design with modern comfort.",
    properties: 41
  }
];

export const getCityByName = (name: string): City | undefined => {
  return cities.find(city => city.name.toLowerCase() === name.toLowerCase());
};