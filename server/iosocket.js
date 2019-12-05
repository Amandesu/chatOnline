const socket = require("socket.io");

const redis = require("./utils/redis.js");





module.exports = (server) => {
    const io = socket(server);

    // 所有活动中的socket
    var mapAcsocket = {};
    
    
    io.on('connection', socket => {
        // 有新用户上线了
        socket.on('new user', (username, aliaName) => {
            socket.username = username;
            mapAcsocket[username] = socket;
                
            socket.emit('login', "login")

                // socket.emit('login',user);
                // socket.broadcast.emit('user joined',username,(user.length-1));
                // console.log(user);
        })
        //前端io.send(message)
        socket.on('message', async function (message) {
            
        })
        socket.on('send private message', async function (res, fn) {
            let user  = res.user;
            if (res.recipient) {
                fn("success")
                let recipient = res.recipient
                redis.pushURMsg(res.recipient, {
                    type:res.type,
                    sendUser:user.username,
                    aliaName:user.aliaName,
                    content:res.content
                })              
                // 触发用户客户端的receive private message事件
                let resSocket = mapAcsocket[res.recipient];
                resSocket && resSocket.emit('receive private message', {
                    type:res.type,
                    sendUser:user.username,
                    content:res.content
                });

            } else {
                fn(null)
            }
        })
        //监听客户端断开连接
        socket.on('disconnect', async function () {
            console.log(socket.username+"-disconnect")
            if(socket.username in mapAcsocket){
                Reflect.deleteProperty(mapAcsocket, socket.username) 
                console.log("delete socket")
            }
        })
    });
}