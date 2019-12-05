
const userService = require('./../services/user')
const redis = require('./../utils/redis')
const { createSucResult, createFailResult } = require("../utils/createResult")


// 注册
const getUnreadMsg = async (ctx) => {
    let res = await redis.getURMsg(ctx.session.user.username) 
    ctx.body = createSucResult({data:res})
    
}

module.exports = {
    getUnreadMsg
}      