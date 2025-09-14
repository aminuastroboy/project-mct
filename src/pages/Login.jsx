import React, { useState } from 'react'

export default function Login({ onLogin }){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)

  function submit(e){
    e.preventDefault()
    if (isSignup){
      const user = { username, password, name: username }
      localStorage.setItem('cc_user', JSON.stringify(user))
      onLogin(user)
    } else {
      const saved = JSON.parse(localStorage.getItem('cc_user') || 'null')
      if (saved && saved.password === password){
        onLogin(saved)
      } else {
        alert('Invalid login')
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-screen" style={{background:'linear-gradient(180deg,#fff0f6,#fff7fb)'}}>
      <form onSubmit={submit} className="card w-80 rounded-xl-2 p-6">
        <h2 style={{color:'#ec4899',fontSize:18,fontWeight:700}}>Welcome to Cycle Care</h2>
        <input className="mt-4 p-2 border rounded-lg w-full" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
        <input className="mt-3 p-2 border rounded-lg w-full" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn-primary w-full mt-4" type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        <p className="small mt-3 text-center" onClick={()=>setIsSignup(!isSignup)} style={{cursor:'pointer'}}>{isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}</p>
      </form>
    </div>
  )
}
