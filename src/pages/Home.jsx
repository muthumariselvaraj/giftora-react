import { useState } from 'react'
import Photo from '../components/Photo.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { OCCASIONS, MOODS } from '../data.js'

export default function Home({ products }) {
  const [mood, setMood] = useState(null)
  const [note, setNote] = useState('You make the world brighter')
  const list = products ? (mood ? products.filter((p) => p.mood === mood.key) : products.filter((p) => p.rating >= 4.6)).slice(0, 4) : null

  return (
    <div className="wrap">
      {/* Hero */}
      <section className="hgrid">
        <div className="hero">
          <div className="ht">
            <small>MAKE EVERY MOMENT SPECIAL</small>
            <h1>Thoughtful Gifts<br /><i>for Every Story</i></h1>
            <p>From birthdays to big dreams, find the perfect gift that speaks from your heart.</p>
            <a className="dk" href="#/shop">Explore Collections →</a>
          </div>
          <div className="hi"><Photo q="gift,flowers" seed={7} w={700} h={520} alt="Gifts" /></div>
        </div>
        <div className="side">
          <div className="mini pinkc">
            <div>
              <h3>✦ Build Your Own<br />Gift Box</h3>
              <p>Choose your favourite items, add a personal message and see it live.</p>
              <a className="dk sm" href="#/build">Start Building →</a>
            </div>
            <div className="mimg"><Photo q="giftbox" seed={3} w={300} h={300} alt="Gift box" /></div>
          </div>
          <div className="mini aic">
            <div>
              <h3>✦ Meet Giftora AI</h3>
              <p>Tell us the occasion, budget and vibe — let AI find the perfect gift.</p>
              <a className="pill" href="#/ai">Find My Perfect Gift →</a>
            </div>
            <div className="bot">🤖</div>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="card">
        <h2 className="st">Shop by Occasion</h2>
        <div className="occ">
          {OCCASIONS.map((o) => (
            <a key={o.name} href={'#/shop?occ=' + encodeURIComponent(o.name)} className="oc">
              <span>{o.icon}</span>{o.name}
            </a>
          ))}
        </div>
      </section>

      {/* Mood + Trending + Personalize */}
      <section className="row3">
        <div className="mood">
          <h3>Find Gifts by Mood</h3>
          <small>How are you feeling today?</small>
          {MOODS.map((m) => (
            <button key={m.key} className={'mb ' + (mood?.key === m.key ? 'on' : '')}
              onClick={() => setMood(mood?.key === m.key ? null : m)}>{m.icon} {m.name}</button>
          ))}
          <p className="mq">{mood ? mood.quote : 'Pick a mood to see matching gifts →'}</p>
        </div>

        <div className="card">
          <div className="rowb"><h2 className="st">✦ {mood ? mood.name + ' Gifts' : 'Trending Gifts'}</h2><a href="#/shop" className="va">View All →</a></div>
          <div className="tg">
            {!list ? [0, 1, 2, 3].map((i) => <div key={i} className="shim sk" />)
              : list.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>

        <div className="pz">
          <h3>Personalize <i>Your Gift</i></h3>
          <input className="in" maxLength={32} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type your message" />
          <div className="pzp">
            <Photo q="giftcard" seed={11} w={400} h={300} alt="Card" />
            <div className="pnote">{note || 'Your message'}</div>
          </div>
          <a className="dk sm" href="#/build">Try Now →</a>
        </div>
      </section>
    </div>
  )
}
