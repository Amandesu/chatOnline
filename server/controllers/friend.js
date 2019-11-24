
const freindService = require('./../services/friend')
const userService = require('./../services/user')
const createResult = require("../utils/createResult")

let _result = () => ({
    data: {},
    message: '',
    code: ""
})

const reqFriend = async (ctx) => {
    let result = _result();
    let formData = ctx.request.body;
    let postResult;
    let userResults = await freindService.reqFriend( {
         receiverUser:formData.username,
        'recAliaName':formData.aliaName,
        'user':ctx.session.user.username,
        'aliaName':ctx.session.user.aliaName,
    });
    if (userResults) {
        ctx.body = createResult({
            code:"200"
        })
    }

}


module.exports = {
    reqFriend
}