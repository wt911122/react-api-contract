import PropTypes from 'prop-types';

export function ConfigFactory(config) {

  const {
    name,      
    url,
    headers,
    method,
    pathParam,
    query,
    body,
    response,
  } = config;

  function checkType(config, params, part){
    let error = false;
    PropTypes.checkPropTypes(config, params, part, `${name}: ${extractTail(url)}`, () => {
      error = true;
    });
    return error;
  }

  function checkPath(params){
    return checkType(pathParam, params, 'PATH');
  }

  function checkQuery(params){
    return checkType(query, params, 'QUERY');
  }

  function checkBody(params){
    return checkType(body, params, 'BODY');
  }

  function checkResponse(params){
    return checkType(response, params, 'RESPONSE');
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
    fetch: ({
      pathParam,
      query,
      body,
      fetchOption = {},
    } = {}) => {

    // 检查参数类型 query, payload, appendant
      let paramError = false;
      let queryError = false;
      let bodyError = false;
      if(pathParam && checkPath(pathParam)){
        return Promise.reject(new Error('Error in path'));
      }
      if(query && checkQuery(query)){
        return Promise.reject(new Error('Error in query'));
      }
      if(body && checkBody(body)) {
        return Promise.reject(new Error('Error in body'));
      }
      const a = pathParam && parsePathParam(pathParam);
      const q = query && parseQuery(query);
      const b = body;
      // 如果有query, 整理query字符串
      const m = method.toUpperCase();
      const u = `${url}${a?a:''}${q?q:''}`;

      const options = {};
      Object.assign(options, {
        method: m,
      }, fetchOption)
      if(b){
        options.headers = {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        };
        options.body = JSON.stringify(body);
      }
      return fetch(u, options)
        .then((res) => {
          return res.json();
        })
        .catch((reason) => {
          console.error(reason);
        })
        .then((data) => {
          let responseError = checkResponse(data);
          if(responseError) {throw 'responseError!'}
          return data;
        })
    }
  }
}

function extractTail(url){
  return url.trim().substring(url.lastIndexOf('/')+1);
}

export const combineAPI = function(apis){
  const combinedAPI = {};
  for(let api in apis){
    const p = apis[api];
    if(p.name) {
      const t = ConfigFactory(p)
      combinedAPI[extractTail(p.url)] = t;
    }else{
      combinedAPI[api] = p;
    }
  }
  return combinedAPI;
}

