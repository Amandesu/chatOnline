
const freindService = require('./../services/friend')
const userService = require('./../services/user')
const { createSucResult, createFailResult } = require("../utils/createResult")

let _result = () => ({
    data: {},
    message: '',
    code: ""
})
const reqFriend = async (ctx) => {
    if (!ctx.session.user) {
        ctx.body = createFailResult({});
        return;
    }
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
    if (!ctx.session.user) {
        ctx.body = createFailResult({});
        return;
    }
    let formData = ctx.request.body;
    let userResults = await freindService.addFriend( {
        'username':ctx.session.user.username,
        'friend':formData.friend
    });
    console.log(userResults)
    if (userResults) {
        ctx.body = createSucResult({});
    }
}

const queryReqFris =  async (ctx) => {
    if (!ctx.session.user) {
        ctx.body = createFailResult({});
        return;
    }
    let formData = ctx.query;
    let userResults = [];

    userResults = await freindService.queryReqFris( {
        username:ctx.session.user.username,
        isSend:formData.isSend || null
   });
    if (userResults) {
        ctx.body = createSucResult({
            data:userResults
        })
    }
}
const getFriendList = async (ctx) => {
    if (!ctx.session.user) {
        ctx.body = createFailResult({});
        return;
    }
    let formData = ctx.query;
    let userResults = await freindService.getFriendList( {
        username:ctx.session.user.username,
    });
    if (userResults) {
        ctx.body = createSucResult({ data:userResults })
    } else {
        ctx.body = createFailResult({});
    }

}


module.exports = {
    reqFriend, addFriend, queryReqFris, getFriendList
}