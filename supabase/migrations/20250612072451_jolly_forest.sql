/*
  # Create destinations and hotels tables

  1. New Tables
    - `destinations`
      - `destination_id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `image` (text)
      - `description` (text)
      - `country` (text, default 'USA')
      - `hotel_count` (integer, default 0)
      - `featured` (text)

    - `hotels` (already exists, but we'll ensure it has the right structure)
      - Links to destinations via `destination_id`
      - Contains all hotel information

    - `rooms` (already exists)
      - Links to hotels via `place_id`

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access

  3. Data Population
    - Insert sample destinations
    - Update existing hotels to link to destinations
*/

-- Create destinations table if it doesn't exist
CREATE TABLE IF NOT EXISTS destinations (
  destination_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  image text,
  description text,
  country text DEFAULT 'USA',
  hotel_count integer DEFAULT 0,
  featured text
);

-- Enable RLS on destinations
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to destinations
CREATE POLICY "Public read access for destinations"
  ON destinations
  FOR SELECT
  TO public
  USING (true);

-- Insert sample destinations based on your current cities data
INSERT INTO destinations (name, slug, image, description, hotel_count, featured) VALUES
  (
    'San Francisco',
    'san-francisco',
    'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
    'Iconic hills, Golden Gate Bridge views, and family-friendly neighborhoods with boutique hotels perfect for exploring the city.',
    32,
    'true'
  ),
  (
    'New York',
    'new-york',
    'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg',
    'The city that never sleeps offers world-class museums, Broadway shows, and spacious family suites in the heart of Manhattan.',
    28,
    'true'
  ),
  (
    'London',
    'london',
    'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
    'Historic charm meets modern luxury with family-friendly hotels near iconic landmarks and royal parks.',
    24,
    'true'
  ),
  (
    'Tokyo',
    'tokyo',
    'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    'Experience Japanese hospitality and culture with family accommodations that blend traditional design with modern comfort.',
    41,
    'true'
  )
ON CONFLICT (slug) DO NOTHING;

-- Update hotels table to ensure it has destination links
DO $$
BEGIN
  -- Add destination_id and destination_slug columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'hotels' AND column_name = 'destination_id'
  ) THEN
    ALTER TABLE hotels ADD COLUMN destination_id uuid REFERENCES destinations(destination_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'hotels' AND column_name = 'destination_slug'
  ) THEN
    ALTER TABLE hotels ADD COLUMN destination_slug text;
  END IF;
END $$;

-- Update existing hotels to link to destinations
UPDATE hotels SET 
  destination_id = d.destination_id,
  destination_slug = d.slug
FROM destinations d
WHERE hotels.city = d.name;

-- Add foreign key constraint for destination_id if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'hotels_destination_id_fkey'
  ) THEN
    ALTER TABLE hotels ADD CONSTRAINT hotels_destination_id_fkey 
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id);
  END IF;
END $$;

-- Ensure hotels table has RLS enabled and public read policy
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;

-- Create or replace public read policy for hotels
DROP POLICY IF EXISTS "Public read access" ON hotels;
CREATE POLICY "Public read access for hotels"
  ON hotels
  FOR SELECT
  TO public
  USING (true);

-- Ensure rooms table has RLS enabled and public read policy
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Create or replace public read policy for rooms
DROP POLICY IF EXISTS "Public read access for rooms" ON rooms;
CREATE POLICY "Public read access for rooms"
  ON rooms
  FOR SELECT
  TO public
  USING (true);