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



module.exports = ({code = "200", data = null}) => {
    if (code == "200") {
        return Object.assign(_resultSuccess, {code, data});
    } else {
        return Object.assign(_resultSuccess, {code, data});
    }
}