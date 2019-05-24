import React, {Component} from 'react'
import {connect} from 'dva'
import ProductList from '../components/ProductList'
import {Button} from 'antd'

import style from './products.css'

class Products extends Component {
  // static defaultProps {
  //
  // }
  // constructor(props) {
  //   super(props);
  //   this.state = {}
  // }

  componentDidMount() {
    const {dispatch,selectedKeys} = this.props;

    dispatch({type: 'products/init',selectedKeys})
  }

  handleDelete = (id) => {
    const {dispatch} = this.props;
    console.log(`props:${this.props}`)
    dispatch({
      type: 'products/delete',
      payload: id,
      name: 'michong'
    })
  }

  handleChange=(pagination)=>{
    const {current,pageSize} = pagination
    const {dispatch} = this.props;
    dispatch({type: 'products/changePage',pager:{current,pageSize}})
  }
  handleSearch=(selectedKeys, confirm)=>{
    const {dispatch} = this.props;
    confirm()
    dispatch({type: 'products/searchByName',selectedKeys})
  }

  addList = () => {
    const {dispatch} = this.props;
    console.log('添加list')
    dispatch({type: 'products/addData'})
  }

  render() {
    const {products, total, current,searchText} = this.props;

    return (
      <div >
        <h2 className={style.title}>List of Products</h2>
        <Button onClick={this.addList}>添加</Button>
        <div align='center'>
          <ProductList onDelete={this.handleDelete} products={products} total={total} current={current} searchText={searchText}
                       className={style.ProductList} handleTableChange={this.handleChange} handleSearch={this.handleSearch}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {products, total, current,searchText} = state.products;
  return {
    products,
    total,
    current,
    searchText,
  };
}

export default connect(mapStateToProps)(Products)
