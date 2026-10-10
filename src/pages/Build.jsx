import { useState } from 'react'
import Photo from '../components/Photo.jsx'
import { BOXES, RIBBONS } from '../data.js'
import { useStore } from '../store.jsx'

export default function Build({ products }) {
  const { addToCart, say } = useStore()
  const [box, setBox] = useState(BOXES[1])
  const [ribbon, setRibbon] = useState(RIBBONS[0])
  const [picked, setPicked] = useState([])
  const [msg, setMsg] = useState('')

  const sel = picked.map((id) => products?.find((p) => p.id === id)).filter(Boolean)
  const total = box.fee + sel.reduce((s, p) => s + p.price, 0)

  const toggle = (id) => {
    if (picked.includes(id)) return setPicked(picked.filter((x) => x !== id))
    if (picked.length >= 4) return say('Max 4 items per box')
    setPicked([...picked, id])
  }
  const add = () => {
    if (sel.length === 0) return say('Pick at least 1 item')
    addToCart({
      key: 'box-' + Date.now(), id: 100, q: 'giftbox', price: total,
      name: `Custom Gift Box (${box.name}) – ${sel.map((p) => p.name).join(', ')}${msg ? ' · “' + msg + '”' : ''}`,
    })
  }

  return (
    <div className="wrap pg">
      <h1 className="pt">Build Your Own Gift Box</h1>
      <div className="bl">
        <div className="bp">
          <div className="bx" style={{ background: box.color }}>
            <div className="cells">
              {[0, 1, 2, 3].map((i) => (
                <div className="cell" key={i}>
                  {sel[i] ? <Photo q={sel[i].q} seed={sel[i].id} w={260} h={260} alt={sel[i].name} /> : <span>＋</span>}
                </div>
              ))}
            </div>
            <i className="rb v" style={{ background: ribbon }} />
            <i className="rb h" style={{ background: ribbon }} />
            {msg && <div className="note">{msg}</div>}
          </div>
          <p className="mu" style={{ marginTop: 26 }}>Live preview – updates as you choose ✨</p>
        </div>

        <div className="card">
          <h3>1. Choose your box</h3>
          <div className="bar">
            {BOXES.map((b) => (
              <button key={b.id} className={'chip ' + (box.id === b.id ? 'on' : '')} onClick={() => setBox(b)}>
                <span className="dot" style={{ background: b.color }} /> {b.name} · ₹{b.fee}
              </button>
            ))}
          </div>
          <h3>2. Ribbon colour</h3>
          <div className="sw">
            {RIBBONS.map((c) => (
              <button key={c} className={ribbon === c ? 'on' : ''} style={{ background: c }} onClick={() => setRibbon(c)} aria-label={c} />
            ))}
          </div>
          <h3>3. Pick up to 4 items <span className="mu">({picked.length}/4)</span></h3>
          <div className="pick">
            {(products || []).map((p) => (
              <button key={p.id} className={picked.includes(p.id) ? 'on' : ''} onClick={() => toggle(p.id)}>
                <Photo q={p.q} seed={p.id} w={160} h={120} alt={p.name} />
                <small>{p.name}</small><b>₹{p.price}</b>
              </button>
            ))}
          </div>
          <h3>4. Message card</h3>
          <input className="in" maxLength={36} placeholder="Write a short message…" value={msg} onChange={(e) => setMsg(e.target.value)} />
          <button className="dk big" onClick={add}>Add Box to Cart · ₹{total}</button>
        </div>
      </div>
    </div>
  )
}
