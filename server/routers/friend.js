const router = require('koa-router')()
const friend = require('../controllers/friend')
router.post("/reqFriend", friend.reqFriend)
router.post("/addFriend", friend.addFriend)
router.get("/queryReqFris", friend.queryReqFris)
router.post("/getFriendList", friend.getFriendList)


module.exports = router;
