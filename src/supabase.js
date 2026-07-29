import { createClient } from '@supabase/supabase-js'
const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)
export const storage = {
  async get(key) {
    try {
      const { data } = await supabase.from('kv_store').select('value').eq('key', key).single()
      if (!data) return null
      const val = typeof data.value === 'string' ? data.value : JSON.stringify(data.value)
      return { value: val }
    } catch { return null }
  },
  async set(key, value) {
    try {
      let parsed; try { parsed = JSON.parse(value) } catch { parsed = value }
      const { error } = await supabase.from('kv_store').upsert({ key, value: parsed }, { onConflict: 'key' })
      return !error
    } catch { return null }
  }
}
