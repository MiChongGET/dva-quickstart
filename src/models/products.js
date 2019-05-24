import {getList} from '../services/listServices'

export default {
  //namespace表示全局state上的key
  namespace: 'products',
  //state是初始值，这里是空数组
  state: {
    products: [],
    total: 10,
    page: 1
  },

  effects: {
    //初始化表格
    * init(action, {put, call, select}) {
      const page = yield select()
      const res = yield call(getList,{page:1,limit:10})
      console.log(page)
      yield put({type: "initData", payload: res.data, total: res.count})
    },

    //添加按钮功能
    * addData(_, {put, call}) {
      console.log('正在请求数据')
      yield put({type: 'addList'})
    },

    //删除功能
    * delete(action, {put}) {
      console.log(action)
      const {payload, name} = action
      console.log(`payload:${payload}===name:${name}`)
      yield put({type: 'deleteData', payload})
    },
    //表格分页功能
    * changePage(action,{put,call}) {
      console.log(`页码：${action.pager.current}`)
      const {current,pageSize} = action.pager
      const res =  yield call (getList,{page:current,limit:pageSize})
      yield put({type: "initData", payload: res.data, total: res.count})
    }
  },

  reducers: {
    deleteData(state, {payload: id}) {
      console.log(`正在删除${state}===${id}`)
      const products = state.products.filter(item => item.id !== id)
      return {products, total: 20, current: 1};
    },
    addList(state) {
      return [...state, {name: 'michong', id: 23}]
    },
    initData(state, action) {
      console.log('初始化加载数据:' + state)
      const products = action.payload
      console.log(products)
      return {...state, products, total: action.total, current: 1}
    },
    changeCurrentPage(state,action){

    }
  }
}
