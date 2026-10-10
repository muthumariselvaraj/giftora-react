export default function Footer() {
  const f = [['🚚', 'Free Shipping', 'On orders above ₹999'], ['🛡️', 'Secure Payments', '100% safe & trusted'],
    null, ['🎧', '24/7 Support', "We're always here"], ['🌿', 'Eco Friendly', 'Thoughtful packaging']]
  return (
    <footer className="ft">
      <div className="wrap fg">
        {f.map((x, i) => x ? (
          <div key={i} className="fi"><span>{x[0]}</span><div><b>{x[1]}</b><small>{x[2]}</small></div></div>
        ) : (
          <div key={i} className="fb"><span>🎁</span><h3>GIFTORA</h3><small>Gifts that feel personal</small></div>
        ))}
      </div>
    </footer>
  )
}
