const router = require('koa-router')()
const user = require('../controllers/user')
router.post("/register", user.register)
router.post("/login", user.login)
router.get("/queryUsersByName", user.queryUsersByName)

module.exports = router;
