const mongoose = require('mongoose')

const PLATFORMS = ['NES', 'SNES', 'GB', 'GBA', 'GBC', 'MEGA_DRIVE', 'MASTER_SYSTEM', 'N64', 'PS1', 'ARCADE']
const GENRES = ['Action', 'Adventure', 'RPG', 'Puzzle', 'Platform', 'Racing', 'Fighting', 'Sports', 'Shooter', 'Strategy']
const RARITIES = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, enum: PLATFORMS, required: true },
  genre: { type: String, enum: GENRES, required: true },
  description: { type: String, default: '' },
  year: { type: Number },
  developer: { type: String, default: '' },
  coverUrl: { type: String, default: '' },
  screenshots: [String],
  rarity: { type: String, enum: RARITIES, default: 'Common' },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
}, { timestamps: true })

gameSchema.index({ title: 'text', developer: 'text' })

module.exports = mongoose.model('Game', gameSchema)
module.exports.PLATFORMS = PLATFORMS
module.exports.GENRES = GENRES
module.exports.RARITIES = RARITIES
