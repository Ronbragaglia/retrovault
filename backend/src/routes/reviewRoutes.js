const router = require('express').Router()
const c = require('../controllers/reviewController')
const { auth } = require('../middleware/auth')

router.post('/games/:gameId/reviews', auth, c.create)
router.get('/games/:gameId/reviews', c.listByGame)
router.delete('/reviews/:id', auth, c.remove)

module.exports = router
