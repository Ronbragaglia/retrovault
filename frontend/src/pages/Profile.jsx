import { useState, useEffect } from 'react'
import api from '../api/client'
import GameCard from '../components/GameCard'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState('collection')

  useEffect(() => { api.get('/auth/me').then((r) => setUser(r.data.user)) }, [])

  if (!user) return <p className="text-center text-gray-500 py-12">Carregando...</p>

  const items = tab === 'collection' ? user.collection : user.favorites

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-pixel text-lg text-neon-green mb-2">{user.name}</h1>
      <p className="text-sm text-gray-500 mb-6">{user.email}</p>

      <div className="flex gap-4 mb-6">
        {['collection', 'favorites'].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${tab === t ? 'bg-neon-green text-vault-darkest' : 'bg-vault-dark text-gray-400 hover:text-neon-green'}`}>
            {t === 'collection' ? `Minha Colecao (${user.collection?.length || 0})` : `Favoritos (${user.favorites?.length || 0})`}
          </button>
        ))}
      </div>

      {items?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((g) => <GameCard key={g._id} game={g} />)}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12 text-sm">
          {tab === 'collection' ? 'Sua colecao esta vazia' : 'Nenhum favorito ainda'}
        </p>
      )}
    </div>
  )
}
