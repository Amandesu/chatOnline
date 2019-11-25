
const freindService = require('./../services/friend')
const userService = require('./../services/user')
const { createSucResult } = require("../utils/createResult")

let _result = () => ({
    data: {},
    message: '',
    code: ""
})
const reqFriend = async (ctx) => {
    let formData = ctx.request.body;
    let userResults = await freindService.reqFriend( {
         receiverUser:formData.username,
        'recAliaName':formData.aliaName,
        'user':ctx.session.user.username,
        'aliaName':ctx.session.user.aliaName,
    });
    if (userResults) {
        ctx.body = createSucResult({});
    }
}
const addFriend = async (ctx) => {
    let formData = ctx.request.body;
    let userResults = await freindService.addFriend( {
        'username':ctx.session.user.username,
        'friend':formData.friend
    });
    if (userResults) {
        ctx.body = createSucResult({});
    }
}

const queryReqFris =  async (ctx) => {
    let formData = ctx.query;
    let userResults = [];
    if (formData.isSend == 1) {
        userResults = await freindService.queryReqFris( {
            username:formData.username
       });
    } else {
        userResults = await freindService.queryResFris( {
            username:formData.username
       });
    }
    if (userResults) {
        ctx.body = createSucResult({
            data:userResults
        })
    }
}


module.exports = {
    reqFriend, addFriend, queryReqFris
}