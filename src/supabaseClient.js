import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLIC_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLIC_KEY) {
  console.warn("⚠️ Supabase credentials are not defined in the environment variables.");
}

export const supabase = createClient(SUPABASE_URL || "", SUPABASE_PUBLIC_KEY || "");
