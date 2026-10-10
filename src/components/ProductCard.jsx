import Photo from './Photo.jsx'
import { useStore, toItem } from '../store.jsx'

export default function ProductCard({ p }) {
  const { addToCart, wish, toggleWish } = useStore()
  const off = Math.round((1 - p.price / p.mrp) * 100)
  return (
    <div className="pc">
      <div className="pi">
        <Photo q={p.q} seed={p.id} alt={p.name} />
        {p.tag && <span className="tag">{p.tag}</span>}
        {p.match && <span className="tag mt">{p.match}% match</span>}
        <button className="hr" onClick={() => toggleWish(p.id)} aria-label="Wishlist">{wish.includes(p.id) ? '❤️' : '🤍'}</button>
      </div>
      <div className="pb">
        <h4>{p.name}</h4>
        <div className="pr"><b>₹{p.price}</b> <s>₹{p.mrp}</s> <em>({off}% OFF)</em></div>
        <div className="mu">⭐ {p.rating} ({p.reviews})</div>
        <button className="dk" onClick={() => addToCart(toItem(p))}>🛍 Add to Cart</button>
      </div>
    </div>
  )
}
