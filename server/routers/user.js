const router = require('koa-router')()
const user = require('../controllers/user')
router.post("/login", user.login)
router.post("/register", user.register)
router.get("/queryUsersLikeName", user.queryUsersLikeName)

module.exports = router;
