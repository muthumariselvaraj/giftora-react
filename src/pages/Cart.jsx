import { useState } from 'react'
import Photo from '../components/Photo.jsx'
import { useStore } from '../store.jsx'
import { api } from '../api.js'
import { go } from '../router.js'

export default function Cart() {
  const { cart, user, subtotal, setQty, clearCart } = useStore()
  const [f, setF] = useState({ name: user?.name || '', phone: '', addr: '', date: '' })
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)
  const ship = subtotal > 999 || subtotal === 0 ? 0 : 99
  const total = subtotal + ship
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const ok = f.name && f.phone.length >= 10 && f.addr

  const place = async () => {
    setBusy(true)
    const o = await api.placeOrder(user.email, { items: cart, total, address: f })
    setBusy(false); clearCart(); setDone(o)
  }

  if (done) return (
    <div className="wrap pg center">
      <div className="card okc"><div style={{ fontSize: 64 }}>🎉</div><h1 className="pt">Order placed!</h1>
        <p>Your order <b>{done.id}</b> is confirmed. Total ₹{done.total}.</p>
        <a className="dk" href="#/orders">Track my order →</a></div>
    </div>
  )
  if (cart.length === 0) return (
    <div className="wrap pg center"><div className="card okc"><div style={{ fontSize: 64 }}>🛍</div><h2>Your cart is empty</h2>
      <a className="dk" href="#/shop">Browse gifts →</a></div></div>
  )

  return (
    <div className="wrap pg">
      <h1 className="pt">Your Cart</h1>
      <div className="cl">
        <div className="card">
          {cart.map((c) => (
            <div className="ci" key={c.key}>
              <div className="th"><Photo q={c.q} seed={c.id} w={120} h={120} alt="" /></div>
              <div className="cn"><b>{c.name}</b><span className="mu">₹{c.price} each</span></div>
              <div className="qty">
                <button onClick={() => setQty(c.key, c.qty - 1)}>−</button><span>{c.qty}</span><button onClick={() => setQty(c.key, c.qty + 1)}>+</button>
              </div>
              <b>₹{c.price * c.qty}</b>
            </div>
          ))}
        </div>
        <div className="card">
          <h3>Summary</h3>
          <div className="rowb"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="rowb"><span>Shipping</span><span>{ship ? '₹' + ship : 'FREE'}</span></div>
          <div className="rowb tot"><span>Total</span><span>₹{total}</span></div>
          {!user ? (
            <button className="dk big" onClick={() => go('/login?next=/cart')}>Login to checkout</button>
          ) : (
            <div className="fm">
              <input className="in" placeholder="Receiver name" value={f.name} onChange={set('name')} />
              <input className="in" placeholder="Phone (10 digits)" value={f.phone} onChange={set('phone')} />
              <input className="in" placeholder="Delivery address" value={f.addr} onChange={set('addr')} />
              <input className="in" type="date" value={f.date} onChange={set('date')} />
              <button className="dk big" disabled={busy || !ok} style={{ opacity: ok ? 1 : 0.5 }} onClick={place}>
                {busy ? 'Placing order…' : 'Place Order · ₹' + total}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
