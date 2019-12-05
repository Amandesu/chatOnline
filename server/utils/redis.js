// 这里可以设置redis集群
const Redis = require("ioredis");

const redis = new Redis();
 
//redis.keys("*").then(key => redis.del(key));


module.exports = {
    set(...args){
        return redis.set(...args)
    },
    get(...args){
        return redis.get(...args)
    },
    // 在线用户
    getOnlineUsers(){
        return redis.smembers("online_users");
    },
    pushOnlineUsers(username){
        redis.sadd("online_users", username);
    },
    popOnlineUsers(username){
        return redis.srem("online_users", username);
    },
    // 未读消息
    pushURMsg(username, msg){
        return redis.zadd(`${username}-unreadmsg`, +new Date, `${+new Date}<\/>${username}<\/>${JSON.stringify(msg)}`)
    },
    getURMsg(username){
        return redis.zrange(`${username}-unreadmsg`, 0, -1).then(res => {
            //console.log(res)
            
            return res.map(item => {
                let arr =  item.split("<\/>");
                let timestamp = arr[0];
                let msg = JSON.parse(arr.pop());
                msg.timestamp = Number(timestamp);
                return msg;
            })
        }).catch(err => console.log(err))
    },
    popURMsg(username){

    }



};