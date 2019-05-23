import React, {Component} from 'react'
import {connect} from 'dva'
import ProductList from '../components/ProductList'
import {Button} from 'antd'


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
    dispatch({
      type: 'products/delete',
      payload: id,
      name: 'michong'
    })
  }

  addList = () => {
    const {dispatch} = this.props;
    console.log('添加list')
    dispatch({type: 'products/addData'})
  }

  render() {
    const {products, total, current} = this.props;

    return (
      <div>
        <h2>List of Products</h2>
        <Button onClick={this.addList}>添加</Button>
        <ProductList onDelete={this.handleDelete} products={products} total={total} current={current}/>

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
