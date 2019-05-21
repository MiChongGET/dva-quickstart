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
export  function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({data}))
    .catch(err => ({err}));
}

export  function requestPOST(url, data, options = {})
{
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
