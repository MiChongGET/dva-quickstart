import {request} from "../utils/request";

export default {
  //namespace表示全局state上的key
  namespace: 'products',
  //state是初始值，这里是空数组
  state: [],

  effects: {
    * addList(action, {take, put}) {
      // eslint-disable-next-line no-undef
      yield  put({type: 'res'})
    }
  },

  reducers: {
    'delete'(state, {payload: id}) {
      return state.filter(item => item.id !== id);
    },
    'add'(state, {payload: {name, age}}) {
      console.log(`姓名：${name},年龄：${age}`)
      request('http://111.230.51.71:8080/fileupload/myfile/search?page=1&limit=10').then(res => {
        if (res.success) {
          return state;
        }
      }).catch(e => {

      })
      return [...state,{name:'michong',id:23}]
    }
  }
}
