import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import api from '../api/client'

export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('')
    try {
      const { data } = await api.post(isRegister ? '/auth/register' : '/auth/login', form)
      setAuth(data.user, data.token); navigate('/')
    } catch (err) { setError(err.response?.data?.message || 'Erro') }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-vault-dark border border-vault-mid rounded-2xl p-8">
        <h1 className="font-pixel text-sm text-neon-green text-center mb-6">{isRegister ? 'Criar Conta' : 'Entrar'}</h1>
        {error && <p className="text-red-400 text-xs text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Nome" required className="w-full px-3 py-2.5 bg-vault-darker border border-vault-mid rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:border-neon-green focus:outline-none" />
          )}
          <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="Email" required className="w-full px-3 py-2.5 bg-vault-darker border border-vault-mid rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:border-neon-green focus:outline-none" />
          <input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            placeholder="Senha" required className="w-full px-3 py-2.5 bg-vault-darker border border-vault-mid rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:border-neon-green focus:outline-none" />
          <button type="submit" className="w-full py-2.5 bg-neon-green text-vault-darkest font-bold rounded-xl hover:shadow-[0_0_10px_rgba(57,255,20,0.4)] transition">
            {isRegister ? 'Criar Conta' : 'Entrar'}
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-4">
          {isRegister ? 'Ja tem conta?' : 'Nao tem conta?'}{' '}
          <button onClick={() => setIsRegister(!isRegister)} className="text-neon-green font-bold">{isRegister ? 'Entrar' : 'Registrar'}</button>
        </p>
      </div>
    </div>
  )
}
