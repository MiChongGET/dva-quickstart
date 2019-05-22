import React from 'react'
import {connect} from 'dva'
import ProductList from '../components/ProductList'
import {Button} from 'antd'

const Products = ({dispatch, products}) => {

  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id
    })
  }
  
  function addList() {
    dispatch({
      type: 'products/add',
      payload: {name:'michong',age:23}
    })
  }

  return (
    <div>
      <h2>List of Products</h2>
      <Button onClick={addList}>添加</Button>
      <ProductList onDelete={handleDelete}  products={products} />

    </div>
  )
}


export default connect(({products}) => ({
  products,
}))(Products)
