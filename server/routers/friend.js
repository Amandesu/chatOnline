const router = require('koa-router')()
const friend = require('../controllers/friend')
router.post("/postApplyFriendMsg", friend.postApplyFriendMsg)


module.exports = router;
