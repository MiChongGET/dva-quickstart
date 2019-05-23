import {request} from '../utils/request';

export function getList() {
  return request('http://111.230.51.71:8080/fileupload/myfile/search',{page:1,limit:15})
}
