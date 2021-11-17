import { createClient } from '@supabase/supabase-js';

const debug = () => {
  const supabase = createClient('https://mhepvlfgizfzqprpayne.supabase.co', process.env.NEXT_PUBLIC_SUPABASE_KEY);
  supabase.from('repos').select().then(console.log)
}

export {
  debug
}
