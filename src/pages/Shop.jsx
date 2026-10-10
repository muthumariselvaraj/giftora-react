import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { OCCASIONS } from '../data.js'
import { useStore } from '../store.jsx'

export default function Shop({ products, params }) {
  const { wish } = useStore()
  const [occ, setOcc] = useState(params.occ || 'All')
  const [q, setQ] = useState(params.q || '')
  const [sort, setSort] = useState('pop')
  const [max, setMax] = useState(3000)

  useEffect(() => { setOcc(params.occ || 'All'); setQ(params.q || '') }, [params.occ, params.q])

  let list = (products || []).filter((p) =>
    (occ === 'All' || p.occ.includes(occ)) && p.price <= max &&
    p.name.toLowerCase().includes(q.toLowerCase()) && (!params.wish || wish.includes(p.id)))
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
  if (sort === 'rate') list = [...list].sort((a, b) => b.rating - a.rating)

  return (
    <div className="wrap pg">
      <h1 className="pt">{params.wish ? 'Your Wishlist ♡' : 'Shop Gifts'}</h1>
      <div className="bar">
        {['All', ...OCCASIONS.map((o) => o.name)].map((o) => (
          <button key={o} className={'chip ' + (occ === o ? 'on' : '')} onClick={() => setOcc(o)}>{o}</button>
        ))}
      </div>
      <div className="bar">
        <input className="in" style={{ flex: '1 1 220px' }} placeholder="Search gifts…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="in" style={{ width: 190 }} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="pop">Popular</option><option value="rate">Top rated</option>
          <option value="low">Price: low to high</option><option value="high">Price: high to low</option>
        </select>
        <label className="mu">Up to ₹{max}
          <input type="range" min="400" max="3000" step="100" value={max} onChange={(e) => setMax(+e.target.value)} style={{ display: 'block' }} />
        </label>
      </div>
      <div className="sg">
        {!products ? [...Array(8)].map((_, i) => <div key={i} className="shim sk tall" />)
          : list.length === 0 ? <p className="mu">No gifts found. Try another filter.</p>
          : list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
