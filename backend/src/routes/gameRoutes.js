const router = require('express').Router()
const c = require('../controllers/gameController')
const { auth, adminOnly } = require('../middleware/auth')

router.get('/', c.list)
router.get('/platforms', c.getPlatforms)
router.get('/:id', c.getById)
router.post('/', auth, adminOnly, c.create)
router.put('/:id', auth, adminOnly, c.update)
router.delete('/:id', auth, adminOnly, c.remove)

module.exports = router
