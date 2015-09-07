# koa-ioredis

> Using ioredis for koa session middleware. 

[![NPM version][npm-img]][npm-url]
[![Build status][travis-img]][travis-url]
[![Test coverage][coveralls-img]][coveralls-url]
[![License][license-img]][license-url]
[![Dependency status][david-img]][david-url]

## Install

```sh
$ npm install --save koa-ioredis
```

## Usage


```js
import koa from 'koa';
import session from 'koa-generic-session';
import redisStore from 'koa-ioredis';

const app = koa();

app.use(session({
  store: redisStore()
}));

```

[npm-img]: https://img.shields.io/npm/v/koa-ioredis.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-ioredis
[travis-img]: https://img.shields.io/travis/koa-modules/ioredis.svg?style=flat-square
[travis-url]: https://travis-ci.org/koa-modules/ioredis
[coveralls-img]: https://img.shields.io/coveralls/koa-modules/ioredis.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/koa-modules/ioredis?branch=master
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
[david-img]: https://img.shields.io/david/koa-modules/ioredis.svg?style=flat-square
[david-url]: https://david-dm.org/koa-modules/ioredis