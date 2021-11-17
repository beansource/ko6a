import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_HOST, process.env.NEXT_PUBLIC_SUPABASE_KEY);

const debug = () => {
  supabase.from('repos').select().then(console.log)
}

const getAllRepos = async () => {
  return supabase.from('projects').select()
}

export {
  debug,
  getAllRepos
}
