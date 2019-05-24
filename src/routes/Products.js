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
    const {dispatch} = this.props;

    dispatch({type: 'products/init'})
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

  addList = () => {
    const {dispatch} = this.props;
    console.log('添加list')
    dispatch({type: 'products/addData'})
  }

  render() {
    const {products, total, current} = this.props;

    return (
      <div >
        <h2 className={style.title}>List of Products</h2>
        <Button onClick={this.addList}>添加</Button>
        <div align='center'>
          <ProductList onDelete={this.handleDelete} products={products} total={total} current={current}
                       className={style.ProductList} handleTableChange={this.handleChange}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {products, total, current} = state.products;
  return {
    products,
    total,
    current,
  };
}

export default connect(mapStateToProps)(Products)
