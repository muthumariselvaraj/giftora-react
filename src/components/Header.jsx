import { useStore } from '../store.jsx'
import { go } from '../router.js'

const NAV = [['/', 'Home'], ['/shop', 'Shop'], ['/build', 'Build a Box'], ['/ai', 'AI Gift Finder'], ['/about', 'About']]

export default function Header({ path }) {
  const { user, cartCount, wish, signOut } = useStore()
  return (
    <header className="hd">
      <a href="#/" className="brand">
        <span className="bi">🎁</span>
        <span><b>GIFTORA</b><small>Gifts that feel personal</small></span>
      </a>
      <nav>
        {NAV.map(([to, label]) => (
          <a key={to} href={'#' + to} className={path === to ? 'on' : ''}>{label}</a>
        ))}
      </nav>
      <input className="srch" placeholder="Search for gifts, occasions…"
        onKeyDown={(e) => { if (e.key === 'Enter') go('/shop?q=' + encodeURIComponent(e.target.value)) }} />
      <a href="#/shop?wish=1" className="ico" title="Wishlist">♡{wish.length > 0 && <sup>{wish.length}</sup>}</a>
      {user ? (
        <span className="um">
          <a href="#/orders">👤 {user.name.split(' ')[0]}</a>
          <button onClick={signOut}>Logout</button>
        </span>
      ) : (
        <a href="#/login" className="lg">Login</a>
      )}
      <a href="#/cart" className="ico" title="Cart">🛍{cartCount > 0 && <sup>{cartCount}</sup>}</a>
    </header>
  )
}
