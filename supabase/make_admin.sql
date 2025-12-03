-- Replace 'your_email@example.com' with the email you used to sign up
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'somsonengda@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
