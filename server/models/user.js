const dbUtils = require('./../utils/dbUtils')
// 注册
async function register(options) {

  let result = await dbUtils.insertData("users", options)
  return result
}

// 登录
async function login(options) {
    let _sql = `
    SELECT username, aliaName, posterUrl, createTime from users
        where username="${options.username}" AND  password ="${options.password}"
    `
    let result = await dbUtils.query(_sql)
    return result
}
// 获取用户信息
async function getUserInfo(options) {
  let _sql = `
  SELECT username, aliaName, posterUrl, createTime from users
      where username="${options.username}"
  `
  let result = await dbUtils.query(_sql)
  return result
}
// 模糊查询多个用户
async function queryUsersLikeName(options) {
  let _sql = `
  SELECT username, aliaName, posterUrl, createTime from users
      where username LIKE "${options.key}%"
  `
  let result = await dbUtils.query(_sql)
  return result
}
// 查询单个用户
async function queryUserByName(options) {
  let _sql = `
  SELECT username, aliaName, posterUrl, createTime from users
      where username = "${options.username}"
  `
  let result = await dbUtils.query(_sql)
  return result
}

module.exports = {
  register, login, getUserInfo, queryUsersLikeName, queryUserByName
}
