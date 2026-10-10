import Photo from '../components/Photo.jsx'

export default function About() {
  return (
    <div className="wrap pg">
      <h1 className="pt">About Giftora</h1>
      <div className="card ab">
        <div className="abi"><Photo q="gifts,wrapping" seed={31} w={600} h={450} alt="" /></div>
        <div>
          <h2>Gifts that feel personal</h2>
          <p>Giftora helps you turn moments into memories. Build your own box, personalize every detail, or let our AI pick the perfect gift for the occasion, budget and vibe.</p>
          <p className="mu">This is a demo frontend. All data comes from a mock API stored in your browser.</p>
          <a className="dk" href="#/shop">Start shopping →</a>
        </div>
      </div>
    </div>
  )
}
