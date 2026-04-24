const jwt = require('jsonwebtoken')
const User = require('../models/User')

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email ja cadastrado' })
    const user = await User.create({ name, email, password })
    const token = sign(user._id)
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Credenciais invalidas' })
    const token = sign(user._id)
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.me = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password').populate('favorites collection')
  res.json({ user })
}

exports.toggleFavorite = async (req, res) => {
  const user = await User.findById(req.user._id)
  const idx = user.favorites.indexOf(req.params.gameId)
  if (idx === -1) user.favorites.push(req.params.gameId)
  else user.favorites.splice(idx, 1)
  await user.save()
  res.json({ favorites: user.favorites })
}

exports.toggleCollection = async (req, res) => {
  const user = await User.findById(req.user._id)
  const idx = user.collection.indexOf(req.params.gameId)
  if (idx === -1) user.collection.push(req.params.gameId)
  else user.collection.splice(idx, 1)
  await user.save()
  res.json({ collection: user.collection })
}
