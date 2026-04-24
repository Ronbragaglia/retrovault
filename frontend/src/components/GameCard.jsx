import { Link } from 'react-router-dom'
import PlatformBadge from './PlatformBadge'
import { StarIcon } from '@heroicons/react/24/solid'

const rarityColor = { Common: 'text-gray-400', Uncommon: 'text-green-400', Rare: 'text-blue-400', 'Very Rare': 'text-purple-400', Legendary: 'text-yellow-400' }

export default function GameCard({ game }) {
  return (
    <Link to={`/game/${game._id}`} className="bg-vault-dark border border-vault-mid rounded-xl overflow-hidden hover:border-neon-green hover:shadow-[0_0_15px_rgba(57,255,20,0.2)] transition group">
      <div className="aspect-square bg-vault-darker flex items-center justify-center overflow-hidden">
        {game.coverUrl ? (
          <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
        ) : (
          <span className="font-pixel text-xs text-gray-600">NO IMG</span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm text-gray-100 truncate mb-1">{game.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <PlatformBadge platform={game.platform} />
          <span className="text-[10px] text-gray-500">{game.year}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold ${rarityColor[game.rarity] || 'text-gray-400'}`}>{game.rarity}</span>
          <div className="flex items-center gap-1">
            <StarIcon className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs text-gray-300">{game.averageRating?.toFixed(1) || '0.0'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
