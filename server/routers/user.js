const router = require('koa-router')()
const user = require('../controllers/user')
router.post("/login", user.login)
router.get("/queryUsersLikeName", user.queryUsersLikeName)

module.exports = router;
