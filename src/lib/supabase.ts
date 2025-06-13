import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create the client if we have valid credentials
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type Database = {
  public: {
    Tables: {
      user_favorites: {
        Row: {
          id: string
          user_id: string
          property_id: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: number
          created_at?: string
        }
      }
      waitlist: {
        Row: {
          id: string
          email: string
          created_at: string
          source: string | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          source?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          source?: string | null
        }
      }
      destinations: {
        Row: {
          destination_id: string
          name: string
          slug: string
          image: string | null
          description: string | null
          country: string | null
          hotel_count: number | null
          featured: string | null
        }
        Insert: {
          destination_id?: string
          name: string
          slug: string
          image?: string | null
          description?: string | null
          country?: string | null
          hotel_count?: number | null
          featured?: string | null
        }
        Update: {
          destination_id?: string
          name?: string
          slug?: string
          image?: string | null
          description?: string | null
          country?: string | null
          hotel_count?: number | null
          featured?: string | null
        }
      }
      hotels: {
        Row: {
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
        Insert: {
          id?: string
          hotel_name: string
          city?: string | null
          place_id?: string | null
          address?: string | null
          lat?: number | null
          lng?: number | null
          phone_number?: string | null
          review_score?: number | null
          review_count?: number | null
          star_rating?: string | null
          room_notes?: string | null
          tags?: string | null
          featured?: boolean | null
          last_updated?: string | null
          family_deal_available?: boolean | null
          family_deal_only?: boolean | null
          chain_name?: string | null
          destination_id?: string | null
          destination_slug?: string | null
          neighborhood?: string | null
        }
        Update: {
          id?: string
          hotel_name?: string
          city?: string | null
          place_id?: string | null
          address?: string | null
          lat?: number | null
          lng?: number | null
          phone_number?: string | null
          review_score?: number | null
          review_count?: number | null
          star_rating?: string | null
          room_notes?: string | null
          tags?: string | null
          featured?: boolean | null
          last_updated?: string | null
          family_deal_available?: boolean | null
          family_deal_only?: boolean | null
          chain_name?: string | null
          destination_id?: string | null
          destination_slug?: string | null
          neighborhood?: string | null
        }
      }
      rooms: {
        Row: {
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
        Insert: {
          id?: string
          place_id?: string | null
          hotel_name?: string | null
          neighborhood?: string | null
          room_type?: string | null
          bed_count?: number | null
          bed_configuration?: string | null
          sleeps_estimate?: number | null
          price_example?: string | null
          notes?: string | null
          square_footage?: number | null
          kitchenette?: string | null
          additional_bath?: string | null
          separate_bedroom?: string | null
          ada?: boolean | null
          design_forward?: string | null
          inserted_at?: string | null
        }
        Update: {
          id?: string
          place_id?: string | null
          hotel_name?: string | null
          neighborhood?: string | null
          room_type?: string | null
          bed_count?: number | null
          bed_configuration?: string | null
          sleeps_estimate?: number | null
          price_example?: string | null
          notes?: string | null
          square_footage?: number | null
          kitchenette?: string | null
          additional_bath?: string | null
          separate_bedroom?: string | null
          ada?: boolean | null
          design_forward?: string | null
          inserted_at?: string | null
        }
      }
    }
  }
}