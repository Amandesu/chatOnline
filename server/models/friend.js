const dbUtils = require('./../utils/dbUtils')


async function reqFriend(options) {
    let result = await dbUtils.insertData("friend_req", options)
    return result
}

async function queryReqFris(options) {
    let _sql = `
    SELECT * from friend_req
        where user = "${options.username}"
    `
    let result = await dbUtils.query(_sql)
    return result
}
async function queryResFris(options) {
    let _sql = `
SELECT * from friend_req
    where receiverUser = "${options.username}"
`
    let result = await dbUtils.query(_sql)
    return result
}


// 同意朋友申请
async function addFriend(options) {
    //let result = await dbUtils.insertData("friend_req", options)
    let sql = "INSERT INTO friends SET ?";
    let _sql = `UPDATE friend_req SET ? where user = ${options.friend}`;
    console.log(_sql)
    let result = await dbUtils.queryWithTrans([
        { sql, values:[{user:options.username,friend:options.friend}] },
        { sql, values:[{user:options.friend,friend:options.username}] },
        {sql:_sql, values:[{status:"0"}]}
    ]).then((err) => {
        console.log(err)
    })
    return result
}


module.exports = {
    reqFriend,
    queryReqFris,
    queryResFris,
    addFriend
}
