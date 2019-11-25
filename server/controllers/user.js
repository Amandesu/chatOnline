
const userService = require('./../services/user')
const { createSucResult } = require("../utils/createResult")

// 登录
const login = async (ctx) => {
    let formData = ctx.request.body;
    let userResult = await userService.login( formData );

    if (userResult && userResult[0]) {
        ctx.session.user = userResult[0];
    }
    ctx.body = createSucResult({})
}
// 根据关键字查询多个用户
const queryUsersLikeName =  async (ctx) => {
    let result = {};
    let formData = ctx.query
    let userResults = await userService.queryUsersLikeName( formData );
    if (userResults && userResults[0]) {
        userResults.forEach(result => result.createTime = +new Date(result.createTime))
        ctx.body =  createSucResult({
            data:userResults
        })
    } 
    
}

module.exports = {
    login,
    queryUsersLikeName
}