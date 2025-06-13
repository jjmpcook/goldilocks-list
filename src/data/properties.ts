import { Property } from '../types';

export const properties: Property[] = [
  {
    id: 1,
    name: "The Ritz-Carlton, San Francisco",
    location: "Nob Hill, San Francisco",
    city: "San Francisco",
    description: "Perched atop Nob Hill, this luxury hotel offers stunning city and bay views with spacious family suites. Experience San Francisco's charm with easy access to cable cars, Chinatown, and Fisherman's Wharf.",
    price: 599,
    rating: 4.8,
    reviews: 246,
    images: [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg",
      "https://images.pexels.com/photos/261156/pexels-photo-261156.jpeg"
    ],
    amenities: [
      "Kids Club",
      "Family Pool",
      "Playground",
      "Game Room",
      "Family Dining",
      "Free WiFi",
      "Babysitting Services"
    ],
    roomTypes: [
      {
        id: 101,
        name: "Family Suite",
        description: "Spacious suite with separate kids room and city views",
        capacity: 5,
        bedType: "1 King, 2 Twin + Sofa Bed",
        price: 599,
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
      },
      {
        id: 102,
        name: "Deluxe Connecting Rooms",
        description: "Two connecting rooms perfect for larger families",
        capacity: 6,
        bedType: "2 Queen + 2 Twin",
        price: 749,
        image: "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg"
      }
    ],
    perks: [
      "Kids Stay Free",
      "Complimentary Breakfast",
      "Free Airport Shuttle",
      "Welcome Gift for Children"
    ],
    featured: true
  },
  {
    id: 2,
    name: "Hotel Zephyr San Francisco",
    location: "Fisherman's Wharf, San Francisco",
    city: "San Francisco",
    description: "A nautical-themed boutique hotel on the waterfront with playful design and family-friendly amenities. Perfect for exploring Pier 39, Alcatraz, and the Golden Gate Bridge.",
    price: 349,
    rating: 4.6,
    reviews: 189,
    images: [
      "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg",
      "https://images.pexels.com/photos/5971874/pexels-photo-5971874.jpeg",
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
      "https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg"
    ],
    amenities: [
      "Indoor Heated Pool",
      "Kid-friendly Activities",
      "Game Room",
      "Children's Play Area",
      "Family Movie Nights",
      "Bike Rentals",
      "Waterfront Views"
    ],
    roomTypes: [
      {
        id: 201,
        name: "Nautical Family Room",
        description: "Themed room with bunk beds and harbor views",
        capacity: 4,
        bedType: "1 King + Bunk Beds",
        price: 349,
        image: "https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg"
      }
    ],
    perks: [
      "Free Bike Rentals",
      "Complimentary Hot Chocolate",
      "Kids Activity Kit",
      "Harbor View Guarantee"
    ],
    featured: true
  },
  {
    id: 3,
    name: "The Plaza Hotel",
    location: "Fifth Avenue, New York",
    city: "New York",
    description: "An iconic luxury hotel in the heart of Manhattan, offering elegant family suites with Central Park views. Experience the magic of New York with world-class shopping, dining, and Broadway shows at your doorstep.",
    price: 899,
    rating: 4.9,
    reviews: 315,
    images: [
      "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg",
      "https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg",
      "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
    ],
    amenities: [
      "Central Park Views",
      "Kids Concierge",
      "Family Dining",
      "Spa Services",
      "Shopping Access",
      "Broadway Tickets",
      "Museum Partnerships"
    ],
    roomTypes: [
      {
        id: 301,
        name: "Central Park Suite",
        description: "Luxurious suite overlooking Central Park with separate living area",
        capacity: 4,
        bedType: "1 King + 2 Twin",
        price: 899,
        image: "https://images.pexels.com/photos/3555614/pexels-photo-3555614.jpeg"
      },
      {
        id: 302,
        name: "Family Penthouse",
        description: "Spacious penthouse with multiple bedrooms and panoramic city views",
        capacity: 6,
        bedType: "2 King + 2 Twin",
        price: 1299,
        image: "https://images.pexels.com/photos/172872/pexels-photo-172872.jpeg"
      }
    ],
    perks: [
      "Eloise Welcome Package",
      "Central Park Picnic Basket",
      "Broadway Show Discounts",
      "Personal Shopping Service"
    ],
    featured: true
  },
  {
    id: 4,
    name: "Pod Hotels Times Square",
    location: "Times Square, New York",
    city: "New York",
    description: "Modern, efficient design meets family comfort in the heart of Times Square. Smart room layouts maximize space while providing all the amenities families need to explore the city.",
    price: 299,
    rating: 4.5,
    reviews: 278,
    images: [
      "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
      "https://images.pexels.com/photos/4917176/pexels-photo-4917176.jpeg",
      "https://images.pexels.com/photos/6045083/pexels-photo-6045083.jpeg",
      "https://images.pexels.com/photos/847500/pexels-photo-847500.jpeg"
    ],
    amenities: [
      "Times Square Location",
      "Smart Room Design",
      "Family Bunk Rooms",
      "Rooftop Terrace",
      "24/7 Fitness Center",
      "Business Center",
      "Pet Friendly"
    ],
    roomTypes: [
      {
        id: 401,
        name: "Family Pod",
        description: "Cleverly designed room with bunk beds and city views",
        capacity: 4,
        bedType: "1 Queen + Bunk Beds",
        price: 299,
        image: "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg"
      }
    ],
    perks: [
      "Free WiFi",
      "Complimentary City Maps",
      "Subway Access",
      "24/7 Front Desk"
    ],
    featured: true
  },
  {
    id: 5,
    name: "The Langham, London",
    location: "Regent Street, London",
    city: "London",
    description: "A grand Victorian hotel in the heart of London's West End, offering elegant family accommodations with easy access to Oxford Street shopping, theaters, and royal attractions.",
    price: 649,
    rating: 4.8,
    reviews: 256,
    images: [
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg",
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg"
    ],
    amenities: [
      "Traditional Afternoon Tea",
      "Kids Welcome Package",
      "Family Concierge",
      "Indoor Pool",
      "Spa Services",
      "Theater Bookings",
      "Royal Tour Arrangements"
    ],
    roomTypes: [
      {
        id: 501,
        name: "Family Suite",
        description: "Elegant suite with separate children's area and city views",
        capacity: 4,
        bedType: "1 King + 2 Twin",
        price: 649,
        image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
      },
      {
        id: 502,
        name: "Regent Suite",
        description: "Luxurious two-bedroom suite with panoramic London views",
        capacity: 6,
        bedType: "1 King, 2 Queen",
        price: 899,
        image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
      }
    ],
    perks: [
      "Royal Welcome for Kids",
      "Complimentary Afternoon Tea",
      "Theater District Access",
      "Personal Butler Service"
    ],
    featured: true
  },
  {
    id: 6,
    name: "Zetter Townhouse Marylebone",
    location: "Marylebone, London",
    city: "London",
    description: "A charming boutique hotel in a Georgian townhouse, offering intimate family accommodations with quirky British charm and easy access to Regent's Park and London Zoo.",
    price: 399,
    rating: 4.7,
    reviews: 203,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
      "https://images.pexels.com/photos/3754594/pexels-photo-3754594.jpeg",
      "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
      "https://images.pexels.com/photos/3214972/pexels-photo-3214972.jpeg"
    ],
    amenities: [
      "Georgian Architecture",
      "Family Rooms",
      "Regent's Park Access",
      "London Zoo Nearby",
      "Quirky British Design",
      "Cocktail Lounge",
      "Pet Friendly"
    ],
    roomTypes: [
      {
        id: 601,
        name: "Family Townhouse Room",
        description: "Cozy room with British charm and modern family amenities",
        capacity: 4,
        bedType: "1 King + 2 Twin",
        price: 399,
        image: "https://images.pexels.com/photos/4915847/pexels-photo-4915847.jpeg"
      }
    ],
    perks: [
      "London Zoo Tickets",
      "Regent's Park Picnic Kit",
      "British Welcome Tea",
      "Local Area Guide"
    ],
    featured: true
  },
  {
    id: 7,
    name: "Aman Tokyo",
    location: "Otemachi, Tokyo",
    city: "Tokyo",
    description: "A serene urban sanctuary blending traditional Japanese aesthetics with modern luxury. Spacious family accommodations offer a peaceful retreat in the heart of bustling Tokyo.",
    price: 1299,
    rating: 4.9,
    reviews: 189,
    images: [
      "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
      "https://images.pexels.com/photos/5971874/pexels-photo-5971874.jpeg",
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
      "https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg"
    ],
    amenities: [
      "Traditional Japanese Design",
      "Family Onsen",
      "Cultural Activities",
      "Kids Kimono Experience",
      "Tea Ceremony",
      "Zen Garden",
      "Sushi Making Classes"
    ],
    roomTypes: [
      {
        id: 701,
        name: "Deluxe Family Room",
        description: "Spacious room with traditional tatami area and modern amenities",
        capacity: 4,
        bedType: "1 King + Traditional Futon",
        price: 1299,
        image: "https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg"
      },
      {
        id: 702,
        name: "Family Suite",
        description: "Two-room suite with separate living area and city views",
        capacity: 6,
        bedType: "2 King + Traditional Futon",
        price: 1699,
        image: "https://images.pexels.com/photos/584399/living-room-couch-interior-room-584399.jpeg"
      }
    ],
    perks: [
      "Kids Kimono Rental",
      "Traditional Tea Service",
      "Cultural Experience Package",
      "Personal Concierge"
    ],
    featured: true
  },
  {
    id: 8,
    name: "Hotel Gracery Shinjuku",
    location: "Shinjuku, Tokyo",
    city: "Tokyo",
    description: "A modern hotel in the heart of Shinjuku with family-friendly amenities and easy access to Tokyo's best attractions. Features the famous Godzilla head on the building's exterior.",
    price: 299,
    rating: 4.6,
    reviews: 324,
    images: [
      "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
      "https://images.pexels.com/photos/4917176/pexels-photo-4917176.jpeg",
      "https://images.pexels.com/photos/6045083/pexels-photo-6045083.jpeg",
      "https://images.pexels.com/photos/847500/pexels-photo-847500.jpeg"
    ],
    amenities: [
      "Godzilla Terrace",
      "Family Rooms",
      "Shinjuku Station Access",
      "Kids Play Area",
      "Restaurant",
      "24/7 Front Desk",
      "Luggage Storage"
    ],
    roomTypes: [
      {
        id: 801,
        name: "Family Room",
        description: "Modern room with city views and space for the whole family",
        capacity: 4,
        bedType: "2 Queen Beds",
        price: 299,
        image: "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg"
      }
    ],
    perks: [
      "Godzilla Photo Opportunity",
      "Tokyo Metro Pass",
      "Kids Welcome Kit",
      "Local Restaurant Guide"
    ],
    featured: true
  }
];

export const getPropertyById = (id: number): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const getPropertiesByCity = (city: string): Property[] => {
  return properties.filter(property => property.city.toLowerCase() === city.toLowerCase());
};

export const getFeaturedProperties = (): Property[] => {
  return properties.filter(property => property.featured);
};