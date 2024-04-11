import { createClient } from "@supabase/supabase-js";

const supabasekey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!

export const supabase = createClient(supabseURL, supabasekey)