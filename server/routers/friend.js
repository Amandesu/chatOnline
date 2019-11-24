const router = require('koa-router')()
const friend = require('../controllers/friend')
router.post("/reqFriend", friend.reqFriend)


module.exports = router;
