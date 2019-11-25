const friendModel = require('./../models/friend')


const reqFriend  = async (formData) => {
    let resultData = await friendModel.reqFriend({
        'receiverUser':formData.receiverUser,
        'recAliaName':formData.recAliaName,
        'aliaName':formData.aliaName,
        'user':formData.user,
        'status':"1",
        'desc':`我是${formData.user},想加您为好友`,
    }) 
    return resultData
}
const queryReqFris = async (formData) => {
    let resultData = await friendModel.queryReqFris({
        'username':formData.username
    }) 
    return resultData
}
const queryResFris = async (formData) => {
    let resultData = await friendModel.queryResFris({
        'username':formData.username
    }) 
    return resultData
}
const addFriend = async (formData) => {
    let resultData = await friendModel.addFriend({
        'username':formData.username,
        'friend':formData.friend
    }) 
    return resultData
}



module.exports = {
    reqFriend, queryReqFris, queryResFris, addFriend
    
}