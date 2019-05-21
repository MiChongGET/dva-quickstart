export default {
  //namespace表示全局state上的key
  namespace: 'products',
  //state是初始值，这里是空数组
  state: [],
  reducers: {
    'delete'(state, {payload: id}) {
      return state.filter(item => item.id !== id);
    }
  }
}
