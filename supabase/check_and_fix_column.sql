-- Check if the column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'projects';

-- Force add the column again just in case
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS image_url TEXT;
