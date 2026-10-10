import { useEffect, useState } from 'react'

// What to search for each product (so "teddybear" shows a real teddy bear photo)
const SEARCH = {
  'coffee,mug': 'coffee mug gift set',
  bouquet: 'fresh flower bouquet roses',
  teddybear: 'teddy bear soft toy',
  candle: 'scented candles set',
  chocolate: 'chocolate gift hamper',
  photoframe: 'wooden photo frame',
  succulent: 'succulent plant in pot',
  fontainpen: 'fountain pen set',
  fountainpen: 'fountain pen set',
  wristwatch: 'classic wrist watch',
  cake: 'birthday cake',
  diya: 'diwali diya lamp',
  babytoys: 'baby gift toys',
  perfume: 'perfume bottle gift box',
  graduation: 'graduation cap',
  desk: 'desk organizer stationery',
  balloons: 'party balloons',
  'gift,flowers': 'gift box with flowers',
  giftbox: 'gift box hamper',
  giftcard: 'greeting card handwritten',
  'gift,present': 'wrapped gifts presents',
  'gifts,wrapping': 'gift wrapping',
}

// Last-option fallback if every image fails to load
const EMO = {
  'coffee,mug': '☕', bouquet: '💐', teddybear: '🧸', candle: '🕯️', chocolate: '🍫',
  photoframe: '🖼️', succulent: '🪴', fountainpen: '🖊️', wristwatch: '⌚', cake: '🎂',
  diya: '🪔', babytoys: '🍼', perfume: '🧴', graduation: '🎓', desk: '🗂️', balloons: '🎈',
}

// Tries source 1 (Bing thumbnails) -> source 2 (loremflickr) -> emoji
const sources = (q, seed, w, h) => {
  const term = encodeURIComponent(SEARCH[q] || q.replace(/,/g, ' '))
  return [
    `https://tse2.mm.bing.net/th?q=${term}&w=${w}&h=${h}&c=7&rs=1&p=0`,
    `https://loremflickr.com/${w}/${h}/${q}?lock=${seed}`,
  ]
}

export const photoUrl = (q, seed = 1, w = 480, h = 360) => sources(q, seed, w, h)[0]

export default function Photo({ q, seed = 1, w = 480, h = 360, alt = '' }) {
  const urls = sources(q, seed, w, h)
  const [i, setI] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const failed = i >= urls.length

  // if an image hangs for 7s, move to the next source
  useEffect(() => {
    if (loaded || failed) return
    const t = setTimeout(() => setI((x) => x + 1), 7000)
    return () => clearTimeout(t)
  }, [i, loaded, failed])

  return (
    <div className="ph">
      {!loaded && !failed && <div className="shim" />}
      {failed ? (
        <span className="phe">{EMO[q] || '🎁'}</span>
      ) : (
        <img
          key={i}
          src={urls[i]}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(false); setI((x) => x + 1) }}
        />
      )}
    </div>
  )
}