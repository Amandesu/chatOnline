const dbUtils = require('./../utils/dbUtils')

async function reqFriend(options){
    let result = await dbUtils.insertData("friend_req", options)
    return result
}
module.exports = {

    reqFriend
}
