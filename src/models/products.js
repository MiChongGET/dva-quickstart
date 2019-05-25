import {getList, getSearchList} from '../services/listServices'

export default {
  //namespace表示全局state上的key
  namespace: 'products',
  //state是初始值，这里是空数组
  state: {
    products: [],
    total: 10,
    page: 1,
    searchText: ''
  },

  effects: {
    //初始化表格
    * init(action, {put, call, select}) {
      const {selectedKeys} = action

      const page = yield select()
      let res;
      if (selectedKeys === undefined) {
        console.log(`selectedKeys未定义`)
        res = yield call(getList, {page: 1, limit: 10})
      } else {
        console.log(`selectedKeys:${selectedKeys}`)
        console.log(`selectedKeys存在`)
        res = yield call(getList, {page: 1, limit: 10, name: selectedKeys})
      }

      console.log(page)
      yield put({type: "initListData", payload: res.data, total: res.count})
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
    * changePage(action, {put, call}) {
      console.log(`页码：${action.pager.current}`)
      const {current, pageSize} = action.pager
      const res = yield call(getList, {page: current, limit: pageSize})
      yield put({type: "initData", payload: res.data, total: res.count})
    },
    //搜索
    * searchByName({selectedKeys}, {call, put}) {
      console.log(`selectedKeys:${selectedKeys}`)
      const res = yield call(getSearchList, {page: 1, limit: 10, name: selectedKeys[0]})
      yield put({type: "search", payload: res.data, total: res.count, searchText: selectedKeys[0]})
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
    initListData(state, action) {
      console.log('初始化加载数据:' + state)
      const products = action.payload
      return {...state, products, total: action.total, current: 1,searchText:action.searchText}
    },
    changeCurrentPage(state, action) {

    },
    search(state, action) {
      const {total, searchText} = action
      const products = action.payload
      state.products = []
      return {...state, products, total: total, current: 1, searchText}
    }
  }
}
