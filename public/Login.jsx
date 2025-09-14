import React, { useState } from 'react'

export default function Login({ onLogin }){
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [signup, setSignup] = useState(false)

  function submit(e){
    e.preventDefault()
    if(signup){
      localStorage.setItem('cc_user', JSON.stringify({ username:user, password:pass }))
      onLogin({ username:user })
    } else {
      const saved = JSON.parse(localStorage.getItem('cc_user') || 'null')
      if(saved && saved.password===pass){
        onLogin({ username: saved.username })
      } else {
        alert('Invalid login')
      }
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={submit} className="w-80 card">
        <h2 className="text-lg font-bold text-pink-600">{signup? 'Sign up':'Login'} to Cycle Care</h2>
        <input className="mt-3 p-2 border rounded" placeholder="Username" value={user} onChange={e=>setUser(e.target.value)} required />
        <input className="mt-2 p-2 border rounded" placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} required />
        <button className="mt-4 btn-primary w-full" type="submit">{signup? 'Sign up':'Login'}</button>
        <p className="mt-3 text-sm text-center text-gray-500 cursor-pointer" onClick={()=>setSignup(s=>!s)}>
          {signup? 'Have an account? Login' : 'Don\'t have an account? Sign up'}
        </p>
      </form>
    </div>
  )
}
