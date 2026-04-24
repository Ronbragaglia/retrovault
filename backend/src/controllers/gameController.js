const Game = require('../models/Game')

exports.list = async (req, res) => {
  const { platform, genre, rarity, search, sort = 'title', page = 1, limit = 20 } = req.query
  const filter = {}
  if (platform) filter.platform = platform
  if (genre) filter.genre = genre
  if (rarity) filter.rarity = rarity
  if (search) filter.$text = { $search: search }

  const sortMap = { title: { title: 1 }, year: { year: -1 }, rating: { averageRating: -1 } }
  const sortBy = sortMap[sort] || { title: 1 }

  const [games, total] = await Promise.all([
    Game.find(filter).sort(sortBy).skip((page - 1) * limit).limit(Number(limit)),
    Game.countDocuments(filter),
  ])
  res.json({ games, total, page: Number(page), pages: Math.ceil(total / limit) })
}

exports.getById = async (req, res) => {
  const game = await Game.findById(req.params.id)
  if (!game) return res.status(404).json({ message: 'Game nao encontrado' })
  res.json({ game })
}

exports.create = async (req, res) => {
  const game = await Game.create(req.body)
  res.status(201).json({ game })
}

exports.update = async (req, res) => {
  const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!game) return res.status(404).json({ message: 'Game nao encontrado' })
  res.json({ game })
}

exports.remove = async (req, res) => {
  await Game.findByIdAndDelete(req.params.id)
  res.json({ message: 'Game removido' })
}

exports.getPlatforms = (_, res) => {
  res.json({ platforms: Game.PLATFORMS })
}
