// ---------------- Mock backend (localStorage + fake network delay) ----------------
// Demo login:  demo@giftora.com / demo123
// Replace each function body with fetch('/api/...') to connect a real server.
import { PRODUCTS, MOODS } from './data.js'

const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms))
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }

const users = () => {
  const u = read('gf_users', null)
  if (u) return u
  const seed = [{ name: 'Demo User', email: 'demo@giftora.com', password: 'demo123' }]
  write('gf_users', seed)
  return seed
}

export const api = {
  products: async () => { await wait(700); return PRODUCTS },

  register: async ({ name, email, password }) => {
    await wait()
    const list = users()
    const mail = email.trim().toLowerCase()
    if (list.some((u) => u.email === mail)) throw new Error('This email is already registered')
    write('gf_users', [...list, { name: name.trim(), email: mail, password }])
    return { name: name.trim(), email: mail }
  },

  login: async ({ email, password }) => {
    await wait()
    const u = users().find((x) => x.email === email.trim().toLowerCase() && x.password === password)
    if (!u) throw new Error('Invalid email or password')
    return { name: u.name, email: u.email }
  },

  placeOrder: async (email, order) => {
    await wait(1000)
    const o = { id: 'GO' + Math.floor(10000 + Math.random() * 89999), email, placedAt: Date.now(), ...order }
    write('gf_orders', [o, ...read('gf_orders', [])])
    return o
  },

  orders: async (email) => { await wait(400); return read('gf_orders', []).filter((o) => o.email === email) },

  // "AI" gift finder: scores products by occasion, vibe and budget
  aiFind: async ({ occasion, budget, vibe }) => {
    await wait(1500)
    const scored = PRODUCTS.map((p) => {
      const s = (p.occ.includes(occasion) ? 3 : 0) + (p.mood === vibe ? 2 : 0) + (p.price <= budget ? 2 : -5) + p.rating / 5
      return { p, s }
    }).sort((a, b) => b.s - a.s).slice(0, 4)
    const vibeName = MOODS.find((m) => m.key === vibe)?.name || 'any'
    const results = scored.map(({ p, s }) => ({ ...p, match: Math.max(40, Math.min(98, Math.round(58 + s * 6))) }))
    return {
      text: `For a ${occasion} gift under ₹${budget} with a ${vibeName} vibe, here are my top picks:`,
      results,
    }
  },
}
