// Radius Filler — shared Supabase client
// Replace SUPABASE_URL and SUPABASE_ANON_KEY with your project values.
// These are safe to commit — the anon key is public by design; RLS enforces security.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://your-project-ref.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
