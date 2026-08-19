import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error(
    '[supabase] 환경변수가 비어 있습니다.',
    'VITE_SUPABASE_URL:', supabaseUrl || '(없음)',
    'VITE_SUPABASE_KEY:', supabaseKey ? '(설정됨)' : '(없음)'
  )
} else {
  console.info('[supabase] 클라이언트 초기화:', supabaseUrl)
}

export const supabase = createClient(supabaseUrl, supabaseKey)
