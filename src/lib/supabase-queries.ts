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
  hotel_name: string
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
    .order('hotel_name')

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
    .order('hotel_name')

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
    .order('hotel_name')

  if (error) {
    console.error('Error fetching featured hotels:', error)
    return []
  }

  return data as Hotel[]
}