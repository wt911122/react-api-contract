'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineAPI = undefined;
exports.ConfigFactory = ConfigFactory;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConfigFactory(config) {
  // todos

  const name = config.name,
        url = config.url,
        headers = config.headers,
        method = config.method,
        pathParam = config.pathParam,
        query = config.query,
        body = config.body;


  function checkType(config, params, part) {
    try {
      _propTypes2.default.checkPropTypes(config, params, part, `${name}: ${extractTail(url)}`);
    } catch (e) {
      throw e;
      return false;
    }
    return true;
  }

  function checkPath(params) {
    return checkType(pathParam, params, 'PATH');
  }

  function checkQuery(params) {
    return checkType(query, params, 'QUERY');
  }

  function checkBody(params) {
    return checkType(body, params, 'BODY');
  }

  function parseQuery(q) {
    console.log(q);
    return `?${Object.keys(q).map(k => `${k}=${q[k]}`).join('&')}`;
  }

  function parsePathParam(a) {
    console.log(a);
    return `/${a}`;
  }

  return {
    // 参数列表可以加上不管是否成功都执行的回调函数，用于改变loading状态
    fetch: (_ref) => {
      let pathParam = _ref.pathParam,
          query = _ref.query,
          body = _ref.body;
      var _ref$fetchOption = _ref.fetchOption;
      let fetchOption = _ref$fetchOption === undefined ? {} : _ref$fetchOption;


      // TODOS 检查参数类型 query, payload, appendant
      try {
        const a = pathParam && checkPath(pathParam) && parsePathParam(pathParam);
        const q = query && checkQuery(query) && parseQuery(query);
        const b = body && checkBody(body);
        // TODOS 如果有query, 整理query字符串
        const m = method.toUpperCase();
        const u = `${url}${a}${q}`;
        //console.log(payload);
        //console.log(`${url}${a}${q}`);
        const options = {};
        Object.assign(options, {
          method: m
        }, fetchOption);
        if (b) {
          options.body = body;
        }
        console.log(options);

        return fetch(u, options);
      } catch (e) {
        console.error(e);
        return Promise.resolve();
      }
    }
  };
}

function extractTail(url) {
  return url.trim().substring(url.lastIndexOf('/') + 1);
}

const combineAPI = exports.combineAPI = function (apis) {
  const combinedAPI = {};
  for (let api in apis) {
    const p = apis[api];
    if (p.name) {
      const t = ConfigFactory(p);
      combinedAPI[extractTail(p.url)] = t;
    } else {
      console.log(p);
      combinedAPI[api] = p;
      console.log(combinedAPI);
    }
  }
  return combinedAPI;
};