
const userService = require('./../services/user')
const redisStore = require("../redisStore.js")
let _resultSuccess = () => ({
    data: {},
    message: '操作成功',
    code: "200"
})
let _resultError = () => ({
    data: null,
    message: '操作失败',
    code: "500"
})

function isLogin(ctx) {
    if (ctx.session && ctx.session.isLogin) {
        return true;
    }
    let result = _result()
    result.code = "400";
    result.message = "用户未登录";
    ctx.body = result;
    return false;
}

// 登录
const login = async (ctx) => {
    let result = {};
    let formData = ctx.request.body;
   
    let userResult = await userService.login( formData );
    
    console.log(ctx.session)
    if (userResult && userResult[0]) {
        ctx.session.count = 12;
       /*  let session = ctx.session;
        session.isLogin = true
        session.username = userResult[0].username
        session.userId = userResult[0].userId  */
    }
    ctx.body = result

}

// 注册
const register = async (ctx) => {
    let result = _result();
    let formData = ctx.request.body;
    // 是否该用户名已被注册
    let existOne  = await userService.getExistOne(formData);
    if ( existOne  ) {
        if ( existOne .userName === formData.userName ) {
            result.code = "500";
            result.message = "该账号已经被注册"
            ctx.body = result
            return
        }
    }
    // 获取注册结果
    let userResult = await userService.register( formData );
    if ( userResult && userResult.insertId * 1 > 0) {
        result.code = "200";
        result.message = "注册成功"
    } else {
        result.code = "500";
        result.message = "该账号已经被注册"
    }
    ctx.body = result
}
// 查询结果根据用户名
const queryUsersByName = async (ctx) => {
    let result = _result();
    let formData = ctx.query;
    
    if (!isLogin(ctx)) return;

    let userResults = await userService.queryUsersByName( formData );
    if (userResults) {
        result.code = "200";
        result.data = userResults;
    }
    ctx.body = result

}

module.exports = {
    login,
    register,
    queryUsersByName
}