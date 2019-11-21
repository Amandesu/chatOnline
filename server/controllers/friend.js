
const freindService = require('./../services/friend')
const userService = require('./../services/user')


let _result = () => ({
    data: {},
    message: '',
    code: ""
})

const postApplyFriendMsg = async (ctx) => {
    let result = _result();
    let formData = ctx.request.body;
    let postResult;
    
    
    let userResults = await userService.queryUsersByName( {
        username:ctx.session.username
    });
    let friendResults = await userService.queryUsersByName( {
        username:formData.username
    });
    try{
        postResult = await freindService.postApplyFriendMsg(userResults[0], friendResults[0]);
        if (postResult) {
            result.code = 200
            result.message = "已发送好友添加通知"
        }
    } catch(err) {
        if (err.code == "ER_DUP_ENTRY") {
            result.code = 100;
            result.message = "好友已添加无需重复添加"
        }
    }
    ctx.body = result

}


module.exports = {
    postApplyFriendMsg
}