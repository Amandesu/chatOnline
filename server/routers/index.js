const router = require('koa-router')()

const user = require('./user')
const friend = require('./friend')
router.use('/user', user.routes(), user.allowedMethods())
router.use('/friend', friend.routes(), friend.allowedMethods())


module.exports = router
