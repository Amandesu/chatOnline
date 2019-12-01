
const userModel = require('./../models/user')

const register =  async ( formData ) => {
    let resultData = await userModel.register({
      'username': formData.username,
      'password': formData.password})
    return resultData
}

const login =  async ( formData ) => {
    let resultData = await userModel.login({
      'username': formData.username,
      'password': formData.password})
    return resultData
}

// 精确查询单个用户
const queryUserByName  = async (formData) => {
    let resultData = await userModel.queryUserByName({
        'username': formData.username
    })
    return resultData
}
// 模糊查询多个用户
const queryUsersLikeName =  async (formData) => {
    let resultData = await userModel.queryUsersLikeName({
        'key': formData.key
    })
    return resultData
}



module.exports = {
    register,
    login,
    queryUserByName,
    queryUsersLikeName
}