/**!
 * ioredis
 * Copyright(c) 2015 Fangdun Cai
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('koa-ioredis');
var Redis = require('ioredis');
var util = require('util');

/**
 * Expose `RedisStore`.
 */

module.exports = RedisStore;

/**
 * Initialize redis session middleware with `opts`:
 *
 * @param {Object} options
 *   - {String} host      redis connect host
 *   - {Number} port      redis connect port
 *   - {String} socket    redis connect socket
 *   - {String} db        redis db
 *   - {String} password  redis password
 */

function RedisStore(options) {
  if (!(this instanceof RedisStore)) {
    return new RedisStore(options);
  }
  EventEmitter.call(this);
  options = options || {};

  var client = new Redis(options);

  client.on('error', this.emit.bind(this, 'disconnect'));
  client.on('end', this.emit.bind(this, 'disconnect'));
  client.on('connect', this.emit.bind(this, 'connect'));

  this.client = client;
};

util.inherits(RedisStore, EventEmitter);

RedisStore.prototype.get = function *get(sid) {
  var data = yield this.client.get(sid);
  debug('get session: %s', data || 'none');
  if (!data) {
    return null;
  }
  try {
    return JSON.parse(data.toString());
  } catch (err) {
    // ignore err
    debug('parse session error: %s', err.message);
  }
};

RedisStore.prototype.set = function *set(sid, sess, ttl) {
  if (typeof ttl === 'number') {
    ttl = Math.ceil(ttl / 1000);
  }
  sess = JSON.stringify(sess);
  if (ttl) {
    debug('SETEX %s %s %s', sid, ttl, sess);
    yield this.client.setex(sid, ttl, sess);
  } else {
    debug('SET %s %s', sid, sess);
    yield this.client.set(sid, sess);
  }
  debug('SET %s complete', sid);
};

RedisStore.prototype.destroy = function *destroy(sid, sess) {
  debug('DEL %s', sid);
  yield this.client.del(sid);
  debug('DEL %s complete', sid);
};
