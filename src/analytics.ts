import { supabase } from './supabase'

export async function trackVisit() {
  const alreadyVisited = localStorage.getItem('portfolio_visited')

  const { data, error } = await supabase.rpc('track_portfolio_visit', {
    is_new_visitor: !alreadyVisited
  })

  if (error) {
    console.error('Analytics error:', error.message)
    return null
  }

  if (!alreadyVisited) {
    localStorage.setItem('portfolio_visited', 'true')
  }

  return data?.[0] ?? null
}
