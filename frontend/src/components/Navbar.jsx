import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuthStore()

  return (
    <nav className="bg-vault-darker border-b border-vault-mid sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="font-pixel text-neon-green text-sm neon-text">RetroVault</Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/catalog" className="text-gray-300 hover:text-neon-green transition">Catalogo</Link>
          {user ? (
            <>
              <Link to="/profile" className="text-gray-300 hover:text-neon-green transition">Perfil</Link>
              <button onClick={logout} className="text-gray-400 hover:text-red-400 transition">Sair</button>
            </>
          ) : (
            <Link to="/login" className="px-4 py-1.5 border border-neon-green text-neon-green rounded-lg hover:bg-neon-green hover:text-vault-darkest transition text-xs font-bold">Entrar</Link>
          )}
        </div>
        <button className="md:hidden text-gray-300" onClick={() => setOpen(!open)}>
          {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm">
          <Link to="/catalog" onClick={() => setOpen(false)} className="block text-gray-300 hover:text-neon-green">Catalogo</Link>
          {user ? (
            <>
              <Link to="/profile" onClick={() => setOpen(false)} className="block text-gray-300 hover:text-neon-green">Perfil</Link>
              <button onClick={() => { logout(); setOpen(false) }} className="block text-gray-400">Sair</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block text-neon-green">Entrar</Link>
          )}
        </div>
      )}
    </nav>
  )
}
