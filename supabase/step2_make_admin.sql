-- This command makes your user an admin
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'somsonengda@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
