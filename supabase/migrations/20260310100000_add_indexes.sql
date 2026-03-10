-- Add indexes on user_id foreign keys for faster queries
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks (user_id);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects (user_id);
CREATE INDEX IF NOT EXISTS idx_streak_history_user_id ON public.streak_history (user_id);
CREATE INDEX IF NOT EXISTS idx_streak_history_date_key ON public.streak_history (user_id, date_key);
