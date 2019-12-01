let _resultSuccess = {
    data: null,
    message: '操作成功',
    code: "200"
}
let _resultError = {
    data: null,
    message: '操作失败',
    code: "500"
}

exports.createSucResult = ({data = null, message}) => {
    return Object.assign(_resultSuccess, {code:"200", data, message});
}
exports.createFailResult = ({data = null, message}) => {
    return Object.assign(_resultError, {code:"500", data, message})
}
