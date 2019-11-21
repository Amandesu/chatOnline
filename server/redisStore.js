const redis = require("redis");
const redisStore = require('koa-redis');
const session = require('koa-session-minimal')

const client = redis.createClient()
const options = {client: client, db: 1};
const store = redisStore(options);


module.exports = store