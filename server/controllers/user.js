
const userService = require('./../services/user')
const createResult = require("../utils/createResult")

// 登录
const login = async (ctx) => {
    let result = {};
    let formData = ctx.request.body;
    let userResult = await userService.login( formData );

    if (userResult && userResult[0]) {
        ctx.session.loginStatus = 1;
    }
    ctx.body = result
}
// 根据关键字查询多个用户
const queryUsersLikeName =  async (ctx) => {
    let result = {};
    let formData = ctx.query
    let userResult = await userService.queryUsersLikeName( formData );
    if (userResult && userResult[0]) {
        ctx.body =  createResult({
            code:"200",
            data:userResult
        })
    } 
    
}

module.exports = {
    login,
    queryUsersLikeName
}