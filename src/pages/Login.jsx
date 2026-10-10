import { useState } from 'react'
import Photo from '../components/Photo.jsx'
import { api } from '../api.js'
import { useStore } from '../store.jsx'
import { go } from '../router.js'

export default function Login({ params }) {
  const { signIn } = useStore()
  const [mode, setMode] = useState('login')
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    if (mode === 'register' && f.name.trim().length < 2) return setErr('Please enter your name')
    if (f.password.length < 6) return setErr('Password must be at least 6 characters')
    setBusy(true)
    try {
      const u = mode === 'login' ? await api.login(f) : await api.register(f)
      signIn(u)
      go(params.next || '/')
    } catch (x) {
      setErr(x.message)
    }
    setBusy(false)
  }

  return (
    <div className="auth">
      <div className="al">
        <Photo q="gift,present" seed={21} w={800} h={900} alt="" />
        <div className="ao"><h1>Welcome to<br /><i>Giftora</i></h1><p>Gifts that feel personal.</p></div>
      </div>
      <div className="ar">
        <form className="card af" onSubmit={submit}>
          <div className="tabs">
            <button type="button" className={mode === 'login' ? 'on' : ''} onClick={() => { setMode('login'); setErr('') }}>Login</button>
            <button type="button" className={mode === 'register' ? 'on' : ''} onClick={() => { setMode('register'); setErr('') }}>Register</button>
          </div>
          {mode === 'register' && <input className="in" placeholder="Full name" value={f.name} onChange={set('name')} />}
          <input className="in" type="email" required placeholder="Email" value={f.email} onChange={set('email')} />
          <input className="in" type="password" required placeholder="Password" value={f.password} onChange={set('password')} />
          {err && <div className="err">{err}</div>}
          <button className="dk big" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account'}</button>
          {mode === 'login' && (
            <button type="button" className="demo" onClick={() => setF({ ...f, email: 'demo@giftora.com', password: 'demo123' })}>
              Use demo account (demo@giftora.com / demo123)
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
