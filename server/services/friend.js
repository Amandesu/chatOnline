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



module.exports = {
    reqFriend
}