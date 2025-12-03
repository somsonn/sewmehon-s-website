-- 1. Ensure permissions are correct
GRANT SELECT ON public.user_roles TO authenticated;
GRANT SELECT ON public.user_roles TO service_role;

-- 2. Insert the admin role (using case-insensitive email search)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email ILIKE 'somsonengda@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- 3. Verify the result - THIS SHOULD RETURN A ROW
SELECT au.email, ur.role 
FROM auth.users au 
JOIN public.user_roles ur ON au.id = ur.user_id
WHERE au.email ILIKE 'somsonengda@gmail.com';
