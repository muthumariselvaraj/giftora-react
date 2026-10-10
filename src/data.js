export const OCCASIONS = [
  { name: 'Birthday', icon: '🎂' }, { name: 'Anniversary', icon: '💖' },
  { name: 'Friendship', icon: '🤝' }, { name: 'Graduation', icon: '🎓' },
  { name: "Valentine's Day", icon: '💌' }, { name: 'New Baby', icon: '🍼' },
  { name: 'Corporate', icon: '💼' }, { name: 'Just Because', icon: '🎁' },
]

export const MOODS = [
  { key: 'cozy', name: 'Cozy & Calm', icon: '☕', quote: 'Warm gifts for quiet, happy moments.' },
  { key: 'playful', name: 'Happy & Playful', icon: '🎈', quote: 'Because joy should be unwrapped often.' },
  { key: 'romantic', name: 'Romantic', icon: '💗', quote: 'Say it softly, say it with a gift.' },
  { key: 'productive', name: 'Productive', icon: '✨', quote: 'Because your mood deserves a gift too!' },
]

export const BOXES = [
  { id: 'kraft', name: 'Classic Kraft', color: '#c8a27a', fee: 149 },
  { id: 'rose', name: 'Rose Blush', color: '#f3b6c3', fee: 199 },
  { id: 'night', name: 'Midnight', color: '#3b2a4a', fee: 249 },
]
export const RIBBONS = ['#c58b4e', '#ffffff', '#b91c4b', '#2f6f5e', '#111827']

const P = (id, name, q, price, mrp, occ, mood, rating, reviews, tag) =>
  ({ id, name, q, price, mrp, occ, mood, rating, reviews, tag })

export const PRODUCTS = [
  P(1, 'Cozy Moments Gift Set', 'coffee,mug', 1499, 1999, ['Birthday', 'Just Because', 'Friendship'], 'cozy', 4.8, 124, 'Bestseller'),
  P(2, 'Fresh Flower Bouquet', 'bouquet', 899, 1199, ['Anniversary', "Valentine's Day", 'Birthday'], 'romantic', 4.6, 93),
  P(3, 'Teddy Bear – 18 inch', 'teddybear', 1299, 1699, ['Birthday', 'New Baby', "Valentine's Day"], 'playful', 4.7, 84),
  P(4, 'Scented Candle Set', 'candle', 1199, 1599, ['Anniversary', 'Just Because'], 'cozy', 4.9, 156),
  P(5, 'Chocolate Hamper', 'chocolate', 999, 1299, ['Birthday', 'Friendship', 'Just Because'], 'playful', 4.7, 201, 'Trending'),
  P(6, 'Personalized Photo Frame', 'photoframe', 599, 799, ['Anniversary', 'Friendship'], 'romantic', 4.5, 77),
  P(7, 'Succulent Plant Pot', 'succulent', 449, 599, ['Corporate', 'Just Because', 'Friendship'], 'productive', 4.4, 65),
  P(8, 'Premium Pen Set', 'fountainpen', 1599, 1999, ['Graduation', 'Corporate'], 'productive', 4.6, 58),
  P(9, 'Classic Wrist Watch', 'wristwatch', 2499, 3299, ['Graduation', 'Corporate', 'Birthday'], 'productive', 4.7, 112, 'Premium'),
  P(10, 'Birthday Cake', 'cake', 799, 999, ['Birthday'], 'playful', 4.8, 240),
  P(11, 'Diya & Candle Combo', 'diya', 599, 799, ['Just Because', 'Friendship'], 'cozy', 4.5, 88),
  P(12, 'Baby Gift Hamper', 'babytoys', 1799, 2299, ['New Baby'], 'playful', 4.6, 41),
  P(13, 'Perfume Gift Box', 'perfume', 1899, 2499, ['Anniversary', "Valentine's Day", 'Birthday'], 'romantic', 4.8, 133, 'Bestseller'),
  P(14, 'Graduation Cap Kit', 'graduation', 649, 899, ['Graduation'], 'playful', 4.4, 36),
  P(15, 'Desk Organizer Set', 'desk', 899, 1199, ['Corporate', 'Graduation'], 'productive', 4.3, 52),
  P(16, 'Balloon Surprise Pack', 'balloons', 499, 699, ['Birthday', 'Friendship'], 'playful', 4.5, 97),
]
