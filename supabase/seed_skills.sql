-- Clear existing skills
DELETE FROM public.skills;

-- Insert new skills
INSERT INTO public.skills (name, category, level, icon, display_order) VALUES
-- Backend
('Laravel', 'Backend', 80, '🔴', 1),
('PHP', 'Backend', 75, '🐘', 2),
('MySQL', 'Backend', 70, '🐬', 3),

-- Frontend
('Vue.js', 'Frontend', 70, '💚', 1),
('Tailwind CSS', 'Frontend', 80, '🌊', 2),
('TypeScript', 'Frontend', 80, '📘', 3),
('Next.js', 'Frontend', 70, '▲', 4),
('JavaScript', 'Frontend', 80, '💛', 5),
('HTML5', 'Frontend', 90, '📄', 6),
('CSS3', 'Frontend', 85, '🎨', 7),

-- Other
('GitHub', 'Other', 85, '🐙', 1);
