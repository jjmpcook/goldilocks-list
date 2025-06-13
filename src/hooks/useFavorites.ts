import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export const useFavorites = () => {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  // Load favorites from Supabase when user is authenticated
  useEffect(() => {
    if (user) {
      loadFavorites()
    } else {
      // Load from localStorage for non-authenticated users
      const savedFavorites = localStorage.getItem('favorites')
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : [])
    }
  }, [user])

  const loadFavorites = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('property_id')
        .eq('user_id', user.id)

      if (error) throw error

      const favoriteIds = data.map(item => item.property_id)
      setFavorites(favoriteIds)
    } catch (error) {
      console.error('Error loading favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const addFavorite = async (propertyId: number) => {
    if (user) {
      // Add to Supabase for authenticated users
      try {
        const { error } = await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            property_id: propertyId
          })

        if (error) throw error

        setFavorites(prev => [...prev, propertyId])
      } catch (error) {
        console.error('Error adding favorite:', error)
      }
    } else {
      // Add to localStorage for non-authenticated users
      const newFavorites = [...favorites, propertyId]
      setFavorites(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }
  }

  const removeFavorite = async (propertyId: number) => {
    if (user) {
      // Remove from Supabase for authenticated users
      try {
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', propertyId)

        if (error) throw error

        setFavorites(prev => prev.filter(id => id !== propertyId))
      } catch (error) {
        console.error('Error removing favorite:', error)
      }
    } else {
      // Remove from localStorage for non-authenticated users
      const newFavorites = favorites.filter(id => id !== propertyId)
      setFavorites(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }
  }

  const toggleFavorite = (propertyId: number) => {
    if (favorites.includes(propertyId)) {
      removeFavorite(propertyId)
    } else {
      addFavorite(propertyId)
    }
  }

  const isFavorite = (propertyId: number) => favorites.includes(propertyId)

  // Migrate localStorage favorites to Supabase when user signs in
  const migrateFavoritesToSupabase = async () => {
    if (!user) return

    const localFavorites = localStorage.getItem('favorites')
    if (localFavorites) {
      const favoriteIds = JSON.parse(localFavorites)
      
      try {
        // Insert all local favorites to Supabase
        const favoritesToInsert = favoriteIds.map((propertyId: number) => ({
          user_id: user.id,
          property_id: propertyId
        }))

        const { error } = await supabase
          .from('user_favorites')
          .upsert(favoritesToInsert, { onConflict: 'user_id,property_id' })

        if (error) throw error

        // Clear localStorage after successful migration
        localStorage.removeItem('favorites')
        
        // Reload favorites from Supabase
        loadFavorites()
      } catch (error) {
        console.error('Error migrating favorites:', error)
      }
    }
  }

  useEffect(() => {
    if (user) {
      migrateFavoritesToSupabase()
    }
  }, [user])

  return { 
    favorites, 
    loading, 
    toggleFavorite, 
    isFavorite,
    addFavorite,
    removeFavorite
  }
}