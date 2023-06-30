import { createClient } from '@supabase/supabase-js'
if(!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) throw new Error('No Supabase URL or Key')
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase