const friendModel = require('./../models/friend')


const postApplyFriendMsg  = async (useResult, friendResult) => {
    let resultData = await friendModel.postApplyFriendMsg({
        'applyId': useResult.userId,
        'applyName':useResult.username,
        'applyAliasName':useResult.aliasName,
        'applyTime':+new Date(),
        'friendId': friendResult.userId,
        'friendName': friendResult.username,
        'friendAliaName': friendResult.aliasName,
        'status':0,
        'description':`我是${useResult.username},想加您为好友`
    }) 
    return resultData
}



module.exports = {
    postApplyFriendMsg
}