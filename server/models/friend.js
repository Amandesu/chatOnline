const dbUtils = require('./../utils/dbUtils')

async function postApplyFriendMsg(options){
    console.log(options)
    let result = await dbUtils.insertData("friend_apply_message", options)
    return result
}
module.exports = {
  
    postApplyFriendMsg
}
