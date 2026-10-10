import { useEffect, useState } from 'react'

// Tiny hash router: #/shop?occ=Birthday
const parse = () => {
  const h = window.location.hash.replace(/^#/, '') || '/'
  const [path, qs] = h.split('?')
  return { path: path || '/', params: Object.fromEntries(new URLSearchParams(qs || '')) }
}

export function useRoute() {
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const f = () => { setRoute(parse()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  return route
}

export const go = (to) => { window.location.hash = to }
