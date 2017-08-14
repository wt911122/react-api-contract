import PropTypes from 'prop-types';

export function ConfigFactory(config) {
  // todos

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
    try{
      PropTypes.checkPropTypes(config, params, part, `${name}: ${extractTail(url)}`);
    }catch(e){
      throw e;
      return false;
    }
    return true;
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
    }) => {

      // TODOS 检查参数类型 query, payload, appendant
      try{
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
          method: m,
        }, fetchOption)
        if(b){
          options.body = body;
        }
        console.log(options)

        return fetch(u, options)
        .then((res) => {
          try{
            checkResponse(res);
            return res;
          }catch(e){
            console.error(e);
          }
        })
        .catch((reason) => {
          console.error(reason);
        });
      }catch(e){
        console.error(e);
        return Promise.resolve();
      }
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
      console.log(p);
      combinedAPI[api] = p;
      console.log(combinedAPI);
    }
  }
  return combinedAPI;
}

