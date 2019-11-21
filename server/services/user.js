
const userModel = require('./../models/user')

const login =  async ( formData ) => {
    let resultData = await userModel.login({
      'username': formData.username,
      'password': formData.password})
    return resultData
}

const register =  async ( formData ) => {
    let resultData = await userModel.resiger({
      'username': formData.username,
      'password': formData.password})
    return resultData
}
const getExistOne = async (formData) => {
    let resultData = await userModel.getExistOne({
        'username': formData.username
    })
    return resultData
}
const queryUsersByName  = async (formData) => {
    let resultData = await userModel.queryUsersByName({
        'username': formData.username
    })
    return resultData
}


module.exports = {
    register,
    getExistOne,
    queryUsersByName,
    login
}