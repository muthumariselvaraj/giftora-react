import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)
export const useStore = () => useContext(Ctx)

const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
export const toItem = (p) => ({ key: 'p' + p.id, id: p.id, name: p.name, price: p.price, q: p.q })

export function StoreProvider({ children }) {
  const [user, setUser] = useState(() => load('gf_session', null))
  const [cart, setCart] = useState(() => load('gf_cart', []))
  const [wish, setWish] = useState(() => load('gf_wish', []))
  const [toast, setToast] = useState('')

  useEffect(() => { localStorage.setItem('gf_cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('gf_wish', JSON.stringify(wish)) }, [wish])

  const say = (m) => {
    setToast(m)
    clearTimeout(window.__toast)
    window.__toast = setTimeout(() => setToast(''), 1800)
  }
  const addToCart = (item) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.key === item.key)
      if (i >= 0) { const n = [...c]; n[i] = { ...n[i], qty: n[i].qty + 1 }; return n }
      return [...c, { ...item, qty: 1 }]
    })
    say('Added to cart 🎁')
  }
  const setQty = (key, qty) =>
    setCart((c) => (qty < 1 ? c.filter((x) => x.key !== key) : c.map((x) => (x.key === key ? { ...x, qty } : x))))
  const clearCart = () => setCart([])
  const toggleWish = (id) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]))
  const signIn = (u) => { setUser(u); localStorage.setItem('gf_session', JSON.stringify(u)); say('Welcome, ' + u.name.split(' ')[0] + ' 👋') }
  const signOut = () => { setUser(null); localStorage.removeItem('gf_session'); say('Logged out') }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <Ctx.Provider value={{ user, cart, wish, cartCount, subtotal, addToCart, setQty, clearCart, toggleWish, signIn, signOut, say }}>
      {children}
      {toast && <div className="toast">{toast}</div>}
    </Ctx.Provider>
  )
}
