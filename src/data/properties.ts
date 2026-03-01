import { Property } from '../types';
import { getPriceRange } from '../utils/pricing';
import { 
  Hotel, 
  Room, 
  ImageRecord,
  getFeaturedHotels, 
  getHotelsByDestination, 
  getRoomsByHotel,
  getAllUniqueHotels,
  getHotelByPlaceId,
  getRoomsByPlaceId,
  getImagesByPlaceId
} from '../lib/supabase-queries';
import { supabase } from '../lib/supabase';

// Simple memory cache for development speed
const cache = new Map();
const CACHE_TIME = 3 * 60 * 1000; // 3 minutes

// Adapter function to convert Supabase Hotel to Property with enhanced image support
function hotelToProperty(hotel: Hotel, rooms: Room[] = [], images: ImageRecord[] = []): Property {
  // Convert room data to RoomType format
  const roomTypes = rooms.map((room, index) => {
    const price = room.price_example ? parseInt(room.price_example.replace(/[^\d]/g, '')) || 299 : 299;
    return {
      id: parseInt(room.id.substring(0, 8), 16), // Keep as number for room types
      name: room.room_type || 'Standard Room',
      description: room.notes || '',
      capacity: room.sleeps_estimate || 2,
      bedType: room.bed_configuration || '1 King',
      priceRange: getPriceRange(price),
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" // Default image
    };
  });

  // Build images array from multiple sources
  let propertyImages: string[] = [];

  // First, try to use images from your uploaded images table
  if (images && images.length > 0) {
    images.forEach(imageRecord => {
      // Add primary image
      if (imageRecord.primary_image) {
        propertyImages.push(imageRecord.primary_image);
      }
      
      // Add secondary image
      if (imageRecord.secondary_image) {
        propertyImages.push(imageRecord.secondary_image);
      }
      
      // Add gallery images (stored as JSON array)
      if (imageRecord.gallery_images) {
        try {
          const galleryImages = JSON.parse(imageRecord.gallery_images);
          if (Array.isArray(galleryImages)) {
            propertyImages.push(...galleryImages);
          }
        } catch (e) {
          console.warn('Failed to parse gallery_images JSON:', e);
        }
      }
      
      // Add all images (stored as JSON array)
      if (imageRecord.all_images) {
        try {
          const allImages = JSON.parse(imageRecord.all_images);
          if (Array.isArray(allImages)) {
            propertyImages.push(...allImages);
          }
        } catch (e) {
          console.warn('Failed to parse all_images JSON:', e);
        }
      }
    });
  }

  // Fallback to hotel.image_urls if no images from images table
  if (propertyImages.length === 0 && hotel.image_urls) {
    try {
      const parsedImages = JSON.parse(hotel.image_urls);
      if (Array.isArray(parsedImages)) {
        propertyImages = parsedImages;
      }
    } catch (e) {
      console.warn('Failed to parse hotel.image_urls JSON:', e);
    }
  }

  // Final fallback to default images
  if (propertyImages.length === 0) {
    propertyImages = [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg",
      "https://images.pexels.com/photos/261156/pexels-photo-261156.jpeg"
    ];
  }

  const propertyPrice = roomTypes[0]?.priceRange ?
    (roomTypes[0].priceRange === 'budget' ? 150 :
     roomTypes[0].priceRange === 'moderate' ? 300 :
     roomTypes[0].priceRange === 'premium' ? 550 : 800) : 299;

  return {
    id: hotel.place_id || hotel.id, // Use place_id as the main ID for consistency
    name: hotel.property_name || hotel.hotel_name || 'Unnamed Hotel',
    location: hotel.neighborhood || hotel.address || hotel.city || 'Location TBD',
    city: hotel.city || 'Unknown City',
    description: hotel.room_notes || `Experience ${hotel.property_name || hotel.hotel_name || 'this hotel'} in ${hotel.city || 'this destination'}`,
    price: propertyPrice,
    priceRange: getPriceRange(propertyPrice),
    rating: hotel.review_score || 4.5,
    reviews: hotel.review_count || 50,
    images: propertyImages,
    amenities: hotel.tags ? hotel.tags.split(',').map(tag => tag.trim()) : [
      "Free WiFi",
      "Family Friendly",
      "Room Service"
    ],
    roomTypes: roomTypes.length > 0 ? roomTypes : [{
      id: 101,
      name: "Standard Room",
      description: "Comfortable accommodation for families",
      capacity: 4,
      bedType: "1 King + Sofa Bed",
      priceRange: getPriceRange(299),
      image: propertyImages[0] || "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
    }],
    perks: hotel.family_deal_available ? [
      "Family Deals Available",
      "Kids Welcome",
      "Free WiFi"
    ] : ["Free WiFi", "Family Friendly"],
    featured: hotel.featured || false
  };
}

// Async functions to replace the static data
export async function getProperties(): Promise<Property[]> {
  try {
    // Check cache first
    const cacheKey = 'all-properties';
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
      console.log('Using cached properties');
      return cached.data;
    }

    // Get all unique hotels by place_id from Supabase
    const hotels = await getAllUniqueHotels();
    
    if (!hotels || hotels.length === 0) {
      console.log('No hotels found, using fallback');
      return fallbackProperties;
    }
    
    console.log(`Fetched ${hotels.length} unique hotels from Supabase`);
    console.log('First hotel sample:', hotels[0]);
    console.log('Hotel fields available:', hotels[0] ? Object.keys(hotels[0]) : 'No hotels');
    
    const properties: Property[] = [];
    
    for (const hotel of hotels) {
      if (hotel.place_id) {
        const rooms = await getRoomsByPlaceId(hotel.place_id);
        const images = await getImagesByPlaceId(hotel.place_id);
        properties.push(hotelToProperty(hotel, rooms, images));
      }
    }
    
    console.log(`Converted ${properties.length} unique properties`);
    
    // Cache the results
    cache.set(cacheKey, { data: properties, timestamp: Date.now() });
    
    return properties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return fallbackProperties; // Fallback to mock data if Supabase fails
  }
}

export async function getPropertiesByCity(city: string): Promise<Property[]> {
  try {
    console.log(`Searching for hotels in: ${city}`);
    
    // Check cache first
    const cacheKey = `city-${city.toLowerCase()}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
      console.log(`Using cached properties for ${city}`);
      return cached.data;
    }
    
    // Search by multiple fields to catch all possible matches
    const { data: hotels, error } = await supabase!
      .from('hotels')
      .select('*')
      .or(`city.ilike.%${city}%,destination_slug.ilike.%${city.toLowerCase()}%,property_name.ilike.%${city}%,address.ilike.%${city}%`);
    
    if (error) {
      console.error('Database error:', error);
      return [];
    }
    
    console.log(`Raw search results for ${city}:`, hotels);
    console.log(`Found ${hotels?.length || 0} hotels for city: ${city}`);
    
    if (!hotels || hotels.length === 0) {
      return [];
    }
    
    const properties: Property[] = [];

    for (const hotel of hotels) {
      console.log(`Processing hotel:`, {
        name: hotel.property_name || hotel.hotel_name,
        city: hotel.city,
        address: hotel.address
      });

      const rooms = hotel.place_id ? await getRoomsByHotel(hotel.place_id) : [];
      const images = hotel.place_id ? await getImagesByPlaceId(hotel.place_id) : [];
      properties.push(hotelToProperty(hotel, rooms, images));
    }
    
    console.log(`Converted ${properties.length} properties for ${city}`);
    
    // Cache the results
    cache.set(cacheKey, { data: properties, timestamp: Date.now() });
    
    return properties;
  } catch (error) {
    console.error('Error fetching properties by city:', error);
    return [];
  }
}

export async function getFeaturedProperties(): Promise<Property[]> {
  return getProperties();
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  try {
    // If it's a mock ID, check fallback data first
    if (id.startsWith('mock-')) {
      console.log(`Looking for mock property: ${id}`);
      const mockProperty = fallbackProperties.find(prop => prop.id === id);
      if (mockProperty) {
        console.log(`Found mock property: ${mockProperty.name}`);
        return mockProperty;
      }
      console.log(`Mock property ${id} not found in fallback data`);
    }

    // Try Supabase for real IDs (now using place_id as primary identifier)
    console.log(`Looking for property with place_id: ${id}`);
    
    // First try to get hotel by place_id
    const hotel = await getHotelByPlaceId(id);
    
    if (!hotel) {
      console.log(`Hotel not found by place_id: ${id}, trying by regular id`);
      // Fallback to original id-based lookup
      if (!supabase) {
        console.log('Supabase client not available, using fallback data');
        return fallbackProperties.find(prop => prop.id === id);
      }

      const { data: hotelById, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error || !hotelById) {
        console.log('Hotel not found by id either, checking fallback data');
        return fallbackProperties.find(prop => prop.id === id);
      }
      
      // Use the hotel found by id
      const rooms = hotelById.place_id ? await getRoomsByPlaceId(hotelById.place_id) : [];
      const images = hotelById.place_id ? await getImagesByPlaceId(hotelById.place_id) : [];
      return hotelToProperty(hotelById, rooms, images);
    }
    
    console.log(`Found hotel by place_id: ${hotel.property_name || hotel.hotel_name}`);
    
    // Get rooms and images for this hotel using place_id
    const rooms = await getRoomsByPlaceId(id);
    const images = await getImagesByPlaceId(id);
    
    return hotelToProperty(hotel, rooms, images);
  } catch (error) {
    console.error('Error fetching property by id:', error);
    // Final fallback to mock data
    return fallbackProperties.find(prop => prop.id === id);
  }
}

// Keep original mock data as fallback
const fallbackProperties: Property[] = [
  {
    id: "mock-1",
    name: "Pali Hotel Hollywood",
    location: "Hollywood, Los Angeles",
    city: "Los Angeles",
    description: "Mid-century modern design meets family comfort in the heart of Hollywood",
    price: 380,
    rating: 4.6,
    reviews: 189,
    images: [
      "/fonts/02_pali_hwood_property-1-scaled.jpg",
      "/fonts/220419_palihotel_hollywood_c02_watercolor.jpg",
      "/fonts/25_pali_hollywood room.jpg",
      "https://images.pexels.com/photos/261156/pexels-photo-261156.jpeg"
    ],
    amenities: [
      "Connecting rooms available",
      "Pool deck",
      "Family-friendly dining",
      "Rollaway beds",
      "Cribs available",
      "Kid-friendly amenities",
      "Free WiFi"
    ],
    roomTypes: [
      {
        id: 101,
        name: "Family Suite",
        description: "Spacious suite with connecting rooms and Hollywood views",
        capacity: 4,
        bedType: "1 King + Rollaway bed",
        priceRange: 'moderate',
        image: "/fonts/25_pali_hollywood room.jpg"
      }
    ],
    perks: [
      "Rollaway beds",
      "Cribs available",
      "Kid-friendly amenities",
      "Hollywood location"
    ],
    featured: true
  },
  {
    id: "mock-2",
    name: "Petit Pali Ocean",
    location: "Carmel-by-the-Sea",
    city: "Carmel-by-the-Sea",
    description: "Coastal elegance with stunning ocean views and family-first service",
    price: 450,
    rating: 4.7,
    reviews: 156,
    images: [
      "/fonts/petit pali ocean pic.jpg",
      "/fonts/le petit pali ocean deluxekingfireplace room .jpg",
      "/fonts/petit pali ocean lobby 49_lpp_carmel_property-1689705039482.jpg",
      "https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg"
    ],
    amenities: [
      "Ocean views",
      "Fireplace suites",
      "Beach access",
      "Beach equipment",
      "Family concierge",
      "Ocean-view rooms",
      "Free WiFi"
    ],
    roomTypes: [
      {
        id: 201,
        name: "Ocean Deluxe King",
        description: "Elegant room with fireplace and stunning ocean views",
        capacity: 3,
        bedType: "1 King + Sofa bed",
        priceRange: 'premium',
        image: "/fonts/le petit pali ocean deluxekingfireplace room .jpg"
      }
    ],
    perks: [
      "Beach equipment",
      "Family concierge",
      "Ocean-view rooms",
      "Fireplace suites"
    ],
    featured: true
  },
  {
    id: "mock-3",
    name: "The Surfjack",
    location: "Waikiki, Honolulu",
    city: "Honolulu",
    description: "Retro Hawaiian vibes with modern family amenities in paradise",
    price: 520,
    rating: 4.5,
    reviews: 203,
    images: [
      "/fonts/surfjack lobby.jpeg",
      "/fonts/surf jack 1-bedroom-suite-living-area.jpg",
      "/fonts/surfjack sur_1-room_suite.jpg",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
    ],
    amenities: [
      "Pool with swim-up bar",
      "Hawaiian design",
      "Waikiki location",
      "Separate living area",
      "Kitchenette",
      "Pool access",
      "Free WiFi"
    ],
    roomTypes: [
      {
        id: 201,
        name: "1-Bedroom Suite",
        description: "Spacious suite with separate living area and Hawaiian design touches",
        capacity: 4,
        bedType: "1 King + Sofa bed",
        priceRange: 'premium',
        image: "/fonts/surf jack 1-bedroom-suite-living-area.jpg"
      }
    ],
    perks: [
      "Separate living area",
      "Kitchenette",
      "Pool access",
      "Hawaiian experience"
    ],
    featured: true
  },
  {
    id: "mock-4",
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
        id: 201,
        name: "Family Pod",
        description: "Cleverly designed room with bunk beds and city views",
        capacity: 4,
        bedType: "1 Queen + Bunk Beds",
        priceRange: 'moderate',
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
    id: "mock-5",
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
        id: 201,
        name: "Family Suite",
        description: "Elegant suite with separate children's area and city views",
        capacity: 4,
        bedType: "1 King + 2 Twin",
        priceRange: 'premium',
        image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
      },
      {
        id: 202,
        name: "Regent Suite",
        description: "Luxurious two-bedroom suite with panoramic London views",
        capacity: 6,
        bedType: "1 King, 2 Queen",
        priceRange: 'luxury',
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
    id: "mock-6",
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
        id: 201,
        name: "Family Townhouse Room",
        description: "Cozy room with British charm and modern family amenities",
        capacity: 4,
        bedType: "1 King + 2 Twin",
        priceRange: 'moderate',
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
    id: "mock-7",
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
        id: 201,
        name: "Deluxe Family Room",
        description: "Spacious room with traditional tatami area and modern amenities",
        capacity: 4,
        bedType: "1 King + Traditional Futon",
        priceRange: 'luxury',
        image: "https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg"
      },
      {
        id: 202,
        name: "Family Suite",
        description: "Two-room suite with separate living area and city views",
        capacity: 6,
        bedType: "2 King + Traditional Futon",
        priceRange: 'luxury',
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
    id: "mock-8",
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
        id: 201,
        name: "Family Room",
        description: "Modern room with city views and space for the whole family",
        capacity: 4,
        bedType: "2 Queen Beds",
        priceRange: 'moderate',
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

// Legacy sync functions for backward compatibility (now return promises)
export const properties = fallbackProperties; // Keep for immediate fallback

// Note: Components using these functions will need to be updated to handle async