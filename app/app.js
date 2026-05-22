// Radius Filler — Supabase client + shared config
// SUPABASE_URL and SUPABASE_ANON_KEY are safe to commit.
// The anon key is public by design — RLS enforces row-level security.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const SUPABASE_URL     = 'https://your-project-ref.supabase.co';
export const SUPABASE_ANON_KEY = 'your-anon-key-here';
export const PRACTICE_ID      = 'your-practice-id-here'; // set after practice row created

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
