-- Add image_url column to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for project-images bucket
-- Allow public read access
DROP POLICY IF EXISTS "Anyone can view project images" ON storage.objects;
CREATE POLICY "Anyone can view project images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

-- Allow admins to upload images
DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
CREATE POLICY "Admins can upload project images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to update images
DROP POLICY IF EXISTS "Admins can update project images" ON storage.objects;
CREATE POLICY "Admins can update project images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete images
DROP POLICY IF EXISTS "Admins can delete project images" ON storage.objects;
CREATE POLICY "Admins can delete project images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
