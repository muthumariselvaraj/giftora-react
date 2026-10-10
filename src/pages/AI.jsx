import { useEffect, useRef, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { OCCASIONS, MOODS } from '../data.js'
import { api } from '../api.js'

export default function AI() {
  const [occasion, setOcc] = useState('Birthday')
  const [budget, setBudget] = useState(1500)
  const [vibe, setVibe] = useState('cozy')
  const [busy, setBusy] = useState(false)
  const [msgs, setMsgs] = useState([{ from: 'bot', text: "Hi! I'm Giftora AI 🤖 Tell me the occasion, budget and vibe, and I'll find the perfect gift." }])
  const end = useRef(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, [msgs, busy])

  const ask = async () => {
    const vn = MOODS.find((m) => m.key === vibe).name
    setMsgs((m) => [...m, { from: 'me', text: `${occasion} · under ₹${budget} · ${vn}` }])
    setBusy(true)
    const r = await api.aiFind({ occasion, budget, vibe })
    setBusy(false)
    setMsgs((m) => [...m, { from: 'bot', text: r.text, results: r.results }])
  }

  return (
    <div className="wrap pg">
      <h1 className="pt">✦ Giftora AI Gift Finder</h1>
      <div className="aigrid">
        <div className="card">
          <h3>Occasion</h3>
          <select className="in" value={occasion} onChange={(e) => setOcc(e.target.value)}>
            {OCCASIONS.map((o) => <option key={o.name}>{o.name}</option>)}
          </select>
          <h3>Budget: ₹{budget}</h3>
          <input type="range" min="500" max="5000" step="100" value={budget} onChange={(e) => setBudget(+e.target.value)} style={{ width: '100%' }} />
          <h3>Vibe</h3>
          <div className="bar">
            {MOODS.map((m) => <button key={m.key} className={'chip ' + (vibe === m.key ? 'on' : '')} onClick={() => setVibe(m.key)}>{m.icon} {m.name}</button>)}
          </div>
          <button className="dk big" disabled={busy} onClick={ask}>{busy ? 'Thinking…' : 'Find My Perfect Gift →'}</button>
        </div>
        <div className="chat">
          {msgs.map((m, i) => (
            <div key={i}>
              <div className={'bub ' + m.from}>{m.text}</div>
              {m.results && <div className="tg">{m.results.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
            </div>
          ))}
          {busy && <div className="bub bot"><span className="dots"><i /><i /><i /></span></div>}
          <div ref={end} />
        </div>
      </div>
    </div>
  )
}
