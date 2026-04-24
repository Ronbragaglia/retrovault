const Review = require('../models/Review')
const Game = require('../models/Game')

exports.create = async (req, res) => {
  try {
    const { rating, comment } = req.body
    const review = await Review.create({ user: req.user._id, game: req.params.gameId, rating, comment })
    const reviews = await Review.find({ game: req.params.gameId })
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    await Game.findByIdAndUpdate(req.params.gameId, { averageRating: Math.round(avg * 10) / 10, totalReviews: reviews.length })
    res.status(201).json({ review })
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Voce ja avaliou este game' })
    res.status(500).json({ message: err.message })
  }
}

exports.listByGame = async (req, res) => {
  const reviews = await Review.find({ game: req.params.gameId }).populate('user', 'name').sort({ createdAt: -1 })
  res.json({ reviews })
}

exports.remove = async (req, res) => {
  const review = await Review.findById(req.params.id)
  if (!review) return res.status(404).json({ message: 'Review nao encontrada' })
  if (review.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Sem permissao' })
  await review.deleteOne()
  const reviews = await Review.find({ game: review.game })
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0
  await Game.findByIdAndUpdate(review.game, { averageRating: Math.round(avg * 10) / 10, totalReviews: reviews.length })
  res.json({ message: 'Review removida' })
}
