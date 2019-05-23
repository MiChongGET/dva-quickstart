import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {
  //重新修改拼接url，加上请求的参数（）页码之类的
  if (options) {
    let paramsArray = [];
    //拼接参数
    Object.keys(options).forEach(key => paramsArray.push(key + '=' + options[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => (data))
    .catch(err => ({err}));
}

export function requestPOST(url, data, options = {}) {
  return fetch(url, {
    method: 'POST',
    header: {'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    body: data,
    credential: 'include', ...options
  })
    .then(checkStatus)
    .then((data) => ({data}))
    .catch((err) => ({err}));
}
