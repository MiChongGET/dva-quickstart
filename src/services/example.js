import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function qureyList() {
  return request('http://111.230.51.71:8080/fileupload/myfile/search?page=1&limit=1')
}
