const allConfig = require("../config")
const config = allConfig.database
const mysql = require("mysql")
const async = require("async")

const pool = mysql.createPool({
    host: config.HOST,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE
})

let query = async (sql, values) => {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}
// sqlparamsEntities => [{sql, values}, {sql, values}];

// 执行事务
let queryWithTrans = async (sqlparamsEntities) => {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {
                        return reject(err, null);
                    }
                    console.log("开始执行transaction，共执行" + sqlparamsEntities.length + "条数据");
                    var funcAry = [];
                    sqlparamsEntities.forEach(function ({sql, values}) {
                        var temp = function (cb) {
                            console.log(sql, values)
                            connection.query(sql, values, (err, rows) => {
                                if (err) {
                                    connection.rollback(function () {
                                        console.log("事务失败，" + sql + "，ERROR：" + err);
                                        throw err;
                                    });
                                } else {
                                    return cb(null, 'ok');
                                }
                            })
                        };
                        funcAry.push(temp);
                    });
                    async.series(funcAry, function (err, result) {
                        console.log("transaction error: " + err);
                        if (err) {
                            connection.rollback(function (err) {
                                console.log("transaction error: " + err);
                                connection.release();
                                return reject(err, null);
                            });
                        } else {
                            connection.commit(function (err, info) {
                                if (err) {
                                    console.log("执行事务失败，" + err);
                                    connection.rollback(function (err) {
                                        console.log("transaction error: " + err);
                                        connection.release();
                                        return reject(err, null);
                                    });
                                } else {
                                    connection.release();
                                    return reject(null, info);
                                }
                            })
                        }
                    })
                });
            }
        })
    })
}


let createTable = function (sql) {
    return query(sql, [])
}


let findDataById = function (table, id) {
    let _sql = "SELECT * FROM ?? WHERE id = ? "
    return query(_sql, [table, id, start, end])
}


let findDataByPage = function (table, keys, start, end) {
    let _sql = "SELECT ?? FROM ??  LIMIT ? , ?"
    return query(_sql, [keys, table, start, end])
}


let insertData = function (table, values) {
    let _sql = "INSERT INTO ?? SET ?"
    return query(_sql, [table, values])
}


let updateData = function (table, values, id) {
    let _sql = "UPDATE ?? SET ? WHERE id = ?"
    return query(_sql, [table, values, id])
}


let deleteDataById = function (table, id) {
    let _sql = "DELETE FROM ?? WHERE id = ?"
    return query(_sql, [table, id])
}


let select = function (table, keys) {
    let _sql = "SELECT ?? FROM ?? "
    return query(_sql, [keys, table])
}

let count = function (table) {
    let _sql = "SELECT COUNT(*) AS total_count FROM ?? "
    return query(_sql, [table])
}

module.exports = {
    query,
    queryWithTrans,
    createTable,
    findDataById,
    findDataByPage,
    deleteDataById,
    insertData,
    updateData,
    select,
    count,
}
