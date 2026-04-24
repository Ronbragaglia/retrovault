require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const connectDB = require('./config/database')

const app = express()
const PORT = process.env.PORT || 4000

connectDB()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }))

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/games', require('./routes/gameRoutes'))
app.use('/api', require('./routes/reviewRoutes'))

app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => console.log(`RetroVault API running on port ${PORT}`))
