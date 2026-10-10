import { useEffect, useState } from 'react'
import { api } from '../api.js'
import { useStore } from '../store.jsx'

const STEPS = ['Packed 📦', 'Dispatched 🚚', 'Out for delivery 🛵', 'Delivered 🎉']

export default function Orders() {
  const { user } = useStore()
  const [orders, setOrders] = useState(null)
  const [now, setNow] = useState(Date.now())

  useEffect(() => { if (user) api.orders(user.email).then(setOrders) }, [user])
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])

  if (!user) return (
    <div className="wrap pg center"><div className="card okc"><h2>Please login to see your orders</h2><a className="dk" href="#/login?next=/orders">Login →</a></div></div>
  )

  return (
    <div className="wrap pg">
      <h1 className="pt">My Orders</h1>
      {!orders ? <div className="shim sk tall" /> : orders.length === 0 ? <p className="mu">No orders yet. <a href="#/shop"><u>Start shopping</u></a></p> :
        orders.map((o) => {
          const step = Math.min(3, Math.floor((now - o.placedAt) / 8000)) // live tracking demo: +1 step every 8s
          return (
            <div className="card" key={o.id} style={{ marginBottom: 14 }}>
              <div className="rowb"><b>Order {o.id}</b><span className="mu">{new Date(o.placedAt).toLocaleString()}</span></div>
              <p className="mu">{o.items.map((i) => `${i.name} × ${i.qty}`).join(', ')}</p>
              <div className="trk"><i style={{ width: (step / 3) * 100 + '%' }} /><b style={{ left: (step / 3) * 100 + '%' }}>{step < 3 ? '🛵' : '🎉'}</b></div>
              <div className="stp">{STEPS.map((s, i) => <span key={s} className={i <= step ? 'on' : ''}>{s}</span>)}</div>
              <div className="rowb tot"><span>Total</span><span>₹{o.total}</span></div>
            </div>
          )
        })}
    </div>
  )
}
