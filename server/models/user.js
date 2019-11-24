const dbUtils = require('./../utils/dbUtils')

// 登录
async function login(options) {
    let _sql = `
    SELECT * from users
        where username="${options.username}" AND  password ="${options.password}"
    `
    let result = await dbUtils.query(_sql)
    return result
}
// 模糊查询多个用户
async function queryUsersLikeName(options) {
  let _sql = `
  SELECT * from users
      where username LIKE "${options.key}%"
  `
  let result = await dbUtils.query(_sql)
  return result
}


/* // 创建用户
async function resiger(options) {
    let result = await dbUtils.insertData("user", options)
    return result
}
// 查询用户是否存在
async function getExistOne(options ) {
    let _sql = `
    SELECT * from user
      where username="${options.username}"
      limit 1`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
}
// 查询用户通过用户名
async function queryUsersByName(options){
    let _sql = `
    SELECT * from user
      where username like "${options.username}%"
      limit 10`
      let result = await dbUtils.query( _sql )
      return result;

}
 */
module.exports = {
    login, queryUsersLikeName
}
