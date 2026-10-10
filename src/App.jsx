import { useEffect, useState } from 'react'
import { useRoute } from './router.js'
import { api } from './api.js'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Build from './pages/Build.jsx'
import AI from './pages/AI.jsx'
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'
import Orders from './pages/Orders.jsx'
import About from './pages/About.jsx'

export default function App() {
  const { path, params } = useRoute()
  const [products, setProducts] = useState(null)
  useEffect(() => { api.products().then(setProducts) }, [])

  let page
  switch (path) {
    case '/shop': page = <Shop products={products} params={params} />; break
    case '/build': page = <Build products={products} />; break
    case '/ai': page = <AI />; break
    case '/login': page = <Login params={params} />; break
    case '/cart': page = <Cart />; break
    case '/orders': page = <Orders />; break
    case '/about': page = <About />; break
    default: page = <Home products={products} />
  }
  return (
    <>
      <Header path={path} />
      <main>{page}</main>
      <Footer />
    </>
  )
}
