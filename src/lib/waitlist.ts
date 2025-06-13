import { supabase } from './supabase'

export interface WaitlistEntry {
  id?: string
  email: string
  created_at?: string
  source?: string
}

export async function addToWaitlist(email: string, source: string = 'website'): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' }
  }

  try {
    const { error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          source
        }
      ])

    if (error) {
      console.error('Error adding to waitlist:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    return { success: false, error: 'Failed to add to waitlist' }
  }
}

export async function getWaitlistCount(): Promise<number> {
  if (!supabase) {
    return 0
  }

  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Error getting waitlist count:', error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error('Error getting waitlist count:', error)
    return 0
  }
} 