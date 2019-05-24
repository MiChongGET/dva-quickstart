import {request} from '../utils/request';

/**
 * @param option {page:1,limit:15}
 *
 */
export function getList(option) {
  return request('http://111.230.51.71:8080/fileupload/myfile/search',option)
}

export function getSearchList(option) {
  return request("http://111.230.51.71:8080/fileupload/myfile/search?page=1&limit=10&name=redux",option)
}
