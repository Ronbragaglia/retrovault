import { useState, useEffect } from 'react'
import api from '../api/client'
import GameCard from '../components/GameCard'
import SearchBar from '../components/SearchBar'

const platforms = ['', 'NES', 'SNES', 'GB', 'GBA', 'GBC', 'MEGA_DRIVE', 'MASTER_SYSTEM', 'N64', 'PS1', 'ARCADE']
const genres = ['', 'Action', 'Adventure', 'RPG', 'Puzzle', 'Platform', 'Racing', 'Fighting', 'Sports', 'Shooter', 'Strategy']
const rarities = ['', 'Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']

export default function Catalog() {
  const [games, setGames] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState('')
  const [genre, setGenre] = useState('')
  const [rarity, setRarity] = useState('')
  const [sort, setSort] = useState('title')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const params = { page, sort }
    if (search) params.search = search
    if (platform) params.platform = platform
    if (genre) params.genre = genre
    if (rarity) params.rarity = rarity
    api.get('/games', { params }).then((r) => {
      setGames(r.data.games)
      setTotal(r.data.total)
      setPages(r.data.pages)
    }).finally(() => setLoading(false))
  }, [page, search, platform, genre, rarity, sort])

  const Select = ({ value, onChange, options, label }) => (
    <select value={value} onChange={(e) => { onChange(e.target.value); setPage(1) }}
      className="bg-vault-dark border border-vault-mid rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-neon-green focus:outline-none">
      <option value="">{label}</option>
      {options.filter(Boolean).map((o) => <option key={o} value={o}>{o.replace('_', ' ')}</option>)}
    </select>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-pixel text-lg text-neon-green mb-6">Catalogo</h1>
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex-1 min-w-[200px]">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1) }} />
        </div>
        <Select value={platform} onChange={setPlatform} options={platforms} label="Plataforma" />
        <Select value={genre} onChange={setGenre} options={genres} label="Genero" />
        <Select value={rarity} onChange={setRarity} options={rarities} label="Raridade" />
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="bg-vault-dark border border-vault-mid rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-neon-green focus:outline-none">
          <option value="title">A-Z</option>
          <option value="year">Ano</option>
          <option value="rating">Avaliacao</option>
        </select>
      </div>

      <p className="text-xs text-gray-500 mb-4">{total} games encontrados</p>

      {loading ? (
        <p className="text-center text-gray-500 py-12">Carregando...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {games.map((g) => <GameCard key={g._id} game={g} />)}
        </div>
      )}

      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition ${page === i + 1 ? 'bg-neon-green text-vault-darkest' : 'bg-vault-dark text-gray-400 hover:text-neon-green'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
