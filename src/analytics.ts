import { supabase } from './supabase'

export async function trackVisit() {
  const alreadyVisited = localStorage.getItem('portfolio_visited')
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Manila'
  }).format(new Date())
  const dailyVisitKey = `portfolio_visited_${today}`
  const alreadyVisitedToday = localStorage.getItem(dailyVisitKey)

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

  const { error: dailyError } = await supabase.rpc('track_daily_portfolio_visit', {
    is_new_daily_visitor: !alreadyVisitedToday,
    activity_date: today
  })

  if (dailyError) {
    console.error('Daily analytics error:', dailyError.message)
  } else if (!alreadyVisitedToday) {
    localStorage.setItem(dailyVisitKey, 'true')
  }

  return data?.[0] ?? null
}


export async function trackCvDownload() {
  const activityDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Manila'
  }).format(new Date())

  const { error } = await supabase.rpc('track_cv_download', {
    activity_date: activityDate
  })

  if (error) {
    console.error('CV download tracking error:', error.message)
    return false
  }

  return true
}

export async function getDailyStats() {
  const { data, error } = await supabase
    .from('daily_site_stats')
    .select('visit_date, total_visitors, total_page_views, total_cv_downloads')
    .order('visit_date', { ascending: false })
    .limit(7)

  if (error) {
    console.error('Daily stats loading error:', error.message)
    return []
  }

  return (data ?? []).reverse()
}
