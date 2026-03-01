import { supabase } from './supabase'

export interface Destination {
  destination_id: string
  name: string
  slug: string
  image: string | null
  description: string | null
  country: string | null
  hotel_count: number | null
  featured: string | null
}

export interface Hotel {
  id: string
  hotel_name?: string | null
  property_name?: string | null
  city: string | null
  place_id: string | null
  address: string | null
  lat: number | null
  lng: number | null
  phone_number: string | null
  review_score: number | null
  review_count: number | null
  star_rating: string | null
  room_notes: string | null
  tags: string | null
  featured: boolean | null
  last_updated: string | null
  family_deal_available: boolean | null
  family_deal_only: boolean | null
  chain_name: string | null
  destination_id: string | null
  destination_slug: string | null
  neighborhood: string | null
  image_urls?: string | null
}

export interface ImageRecord {
  id: number;
  place_id?: string | null;
  property_name?: string | null;
  primary_image?: string | null;
  secondary_image?: string | null;
  gallery_images?: string | null;
  all_images?: string | null;
  image_order?: number | null;
  image_type?: string | null;
  is_primary?: boolean | null;
  alt_text?: string | null;
  created_at?: string | null;
}

export interface Room {
  id: string
  place_id: string | null
  hotel_name: string | null
  neighborhood: string | null
  room_type: string | null
  bed_count: number | null
  bed_configuration: string | null
  sleeps_estimate: number | null
  price_example: string | null
  notes: string | null
  square_footage: number | null
  kitchenette: string | null
  additional_bath: string | null
  separate_bedroom: string | null
  ada: boolean | null
  design_forward: string | null
  inserted_at: string | null
}

// Get all destinations
export async function getDestinations() {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching destinations:', error)
    return []
  }

  return data as Destination[]
}

// Get destination by slug
export async function getDestinationBySlug(slug: string) {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching destination:', error)
    return null
  }

  return data as Destination
}

// Get hotels by destination
export async function getHotelsByDestination(destinationSlug: string) {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .eq('destination_slug', destinationSlug)
    .order('property_name')

  if (error) {
    console.error('Error fetching hotels:', error)
    return []
  }

  return data as Hotel[]
}

// Get hotel by ID
export async function getHotelById(id: string) {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching hotel:', error)
    return null
  }

  return data as Hotel
}

// Get rooms by hotel place_id
export async function getRoomsByHotel(placeId: string) {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('place_id', placeId)
    .order('room_type')

  if (error) {
    console.error('Error fetching rooms:', error)
    return []
  }

  return data as Room[]
}

// Search hotels by city name
export async function searchHotelsByCity(cityName: string) {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .ilike('city', `%${cityName}%`)
    .order('property_name')

  if (error) {
    console.error('Error searching hotels:', error)
    return []
  }

  return data as Hotel[]
}

// Get featured destinations
export async function getFeaturedDestinations() {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('featured', 'true')
    .order('name')

  if (error) {
    console.error('Error fetching featured destinations:', error)
    return []
  }

  return data as Destination[]
}

// Get featured hotels
export async function getFeaturedHotels() {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .eq('featured', true)
    .order('property_name')

  if (error) {
    console.error('Error fetching featured hotels:', error)
    return []
  }

  return data as Hotel[]
}

// Get all hotels with unique place_ids for property pages
export async function getAllUniqueHotels(): Promise<Hotel[]> {
  try {
    if (!supabase) {
      console.warn('Supabase client not available');
      return [];
    }

    // Get all hotels with place_id, ordered by property name
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .not('place_id', 'is', null)
      .order('property_name');

    if (error) {
      console.error('Error fetching unique hotels:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.log('No hotels found');
      return [];
    }

    // Group by place_id to get unique properties
    const uniqueHotels = new Map<string, Hotel>();
    
    data.forEach(hotel => {
      if (hotel.place_id) {
        // If we already have this place_id, keep the one with more complete data
        const existing = uniqueHotels.get(hotel.place_id);
        if (!existing || 
            (hotel.property_name && !existing.property_name) ||
            (hotel.hotel_name && !existing.hotel_name)) {
          uniqueHotels.set(hotel.place_id, hotel);
        }
      }
    });

    const result = Array.from(uniqueHotels.values());
    console.log(`Found ${result.length} unique hotels with place_ids`);
    
    return result;
  } catch (error) {
    console.error('Error in getAllUniqueHotels:', error);
    return [];
  }
}

// Get hotel by place_id (since that's your common key)
export async function getHotelByPlaceId(placeId: string): Promise<Hotel | null> {
  try {
    if (!supabase) {
      console.warn('Supabase client not available');
      return null;
    }

    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('place_id', placeId)
      .limit(1);

    if (error) {
      console.error('Error fetching hotel by place_id:', error);
      return null;
    }

    return data?.[0] || null;
  } catch (error) {
    console.error('Error in getHotelByPlaceId:', error);
    return null;
  }
}

// Get rooms for a specific place_id
export async function getRoomsByPlaceId(placeId: string): Promise<Room[]> {
  try {
    if (!supabase) {
      console.warn('Supabase client not available');
      return [];
    }

    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('place_id', placeId)
      .order('room_type');

    if (error) {
      console.error('Error fetching rooms by place_id:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getRoomsByPlaceId:', error);
    return [];
  }
}

// Get images for a specific place_id  
export async function getImagesByPlaceId(placeId: string): Promise<ImageRecord[]> {
  try {
    if (!supabase) {
      console.warn('Supabase client not available');
      return [];
    }

    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('place_id', placeId)
      .order('image_order');

    if (error) {
      console.error('Error fetching images by place_id:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getImagesByPlaceId:', error);
    return [];
  }
}

// Submit email to waitlist
export async function submitWaitlistEmail(email: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured')

  const { error } = await supabase
    .from('waitlist')
    .insert({ email, source: 'website' })

  if (error) {
    // Postgres unique_violation — email already on the list
    if (error.code === '23505') {
      throw new Error('already_subscribed')
    }
    throw error
  }
}