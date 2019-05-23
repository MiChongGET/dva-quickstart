import {getList} from '../services/listServices'

export default {
  //namespace表示全局state上的key
  namespace: 'products',
  //state是初始值，这里是空数组
  state: [],

  effects: {
    * init(state, {put, call}) {
      const res = yield call(getList)
      console.log(state)
      yield put({type: "initData", payload:  res.data,total:res.count})
    },

    * addData(_, {put, call}) {
      console.log('正在请求数据')
      yield put({type: 'addList'})
    },

    * delete(action, {put}) {
      console.log(action)
      const {payload, name} = action
      console.log(`payload:${payload}===name:${name}`)
      yield put({type: 'deleteData',payload})
    }
  },

  reducers: {
    deleteData(state, {payload: id}) {
      console.log(`正在删除${state}===${id}`)
      return state.filter(item => item.id !== id);
    },
    addList(state) {

      return [...state, {name: 'michong', id: 23}]
    },
    initData(state, action) {
      console.log('初始化加载数据:'+state)
      const products = action.payload
      console.log(products)
      return [...state, ...products]
    }
  }
}
