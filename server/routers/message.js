const router = require('koa-router')()
const message = require('../controllers/message')
router.get("/getUnreadMsg", message.getUnreadMsg)

module.exports = router;
