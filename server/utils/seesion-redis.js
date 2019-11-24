let redis = require('./redis')

const co = require('co')

module.exports = class Store {
  constructor (store) {
    this.store = redis
  }
  get (sid) {
    return co(this.store.get(sid).then(res => JSON.parse(res)))
  }

  set (sid, val, ttl) {
    return co(this.store.set(sid, JSON.stringify(val), "PX", ttl))
  }

  destroy (sid) {
    return co(this.store.destroy(sid))
  }
}
