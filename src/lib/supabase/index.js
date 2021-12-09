import { createClient } from '@supabase/supabase-js'

let supabaseClient
export default supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_HOST, process.env.NEXT_PUBLIC_SUPABASE_KEY)