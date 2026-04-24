import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/client'
import PlatformBadge from '../components/PlatformBadge'
import { StarIcon } from '@heroicons/react/24/solid'
import { useAuthStore } from '../store/authStore'

export default function GameDetail() {
  const { id } = useParams()
  const { user } = useAuthStore()
  const [game, setGame] = useState(null)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  useEffect(() => {
    api.get(`/games/${id}`).then((r) => setGame(r.data.game))
    api.get(`/games/${id}/reviews`).then((r) => setReviews(r.data.reviews))
  }, [id])

  const submitReview = async (e) => {
    e.preventDefault()
    await api.post(`/games/${id}/reviews`, { rating, comment })
    const r = await api.get(`/games/${id}/reviews`)
    setReviews(r.data.reviews)
    setComment('')
    const g = await api.get(`/games/${id}`)
    setGame(g.data.game)
  }

  if (!game) return <p className="text-center text-gray-500 py-12">Carregando...</p>

  const rarityColor = { Common: 'text-gray-400', Uncommon: 'text-green-400', Rare: 'text-blue-400', 'Very Rare': 'text-purple-400', Legendary: 'text-yellow-400' }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-64 aspect-square bg-vault-dark rounded-xl overflow-hidden flex-shrink-0">
          {game.coverUrl ? <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-pixel text-xs text-gray-600">NO IMG</div>}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-100 mb-2">{game.title}</h1>
          <div className="flex items-center gap-3 mb-3">
            <PlatformBadge platform={game.platform} />
            <span className="text-sm text-gray-400">{game.year}</span>
            <span className={`text-sm font-bold ${rarityColor[game.rarity]}`}>{game.rarity}</span>
          </div>
          {game.developer && <p className="text-sm text-gray-400 mb-2">Dev: {game.developer}</p>}
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} className={`w-5 h-5 ${s <= Math.round(game.averageRating) ? 'text-yellow-400' : 'text-gray-600'}`} />)}
            <span className="text-sm text-gray-300 ml-1">{game.averageRating?.toFixed(1)} ({game.totalReviews})</span>
          </div>
          <p className="text-sm text-gray-400">{game.description}</p>
        </div>
      </div>

      <h2 className="font-bold text-lg text-gray-200 mb-4">Reviews ({reviews.length})</h2>

      {user && (
        <form onSubmit={submitReview} className="bg-vault-dark border border-vault-mid rounded-xl p-4 mb-6">
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" onClick={() => setRating(s)}>
                <StarIcon className={`w-6 h-6 ${s <= rating ? 'text-yellow-400' : 'text-gray-600'} transition`} />
              </button>
            ))}
          </div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Seu comentario..."
            className="w-full bg-vault-darker border border-vault-mid rounded-lg p-3 text-sm text-gray-200 placeholder-gray-500 focus:border-neon-green focus:outline-none mb-3" rows={3} />
          <button type="submit" className="px-6 py-2 bg-neon-green text-vault-darkest font-bold rounded-lg text-sm hover:shadow-[0_0_10px_rgba(57,255,20,0.4)] transition">
            Enviar Review
          </button>
        </form>
      )}

      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r._id} className="bg-vault-dark border border-vault-mid rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-gray-200">{r.user?.name}</span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'text-yellow-400' : 'text-gray-600'}`} />)}
              </div>
            </div>
            {r.comment && <p className="text-sm text-gray-400">{r.comment}</p>}
          </div>
        ))}
        {reviews.length === 0 && <p className="text-center text-gray-500 py-6 text-sm">Nenhuma review ainda</p>}
      </div>
    </div>
  )
}
