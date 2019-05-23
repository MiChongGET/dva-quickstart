import React, {Component} from 'react'
import {connect} from 'dva'
import ProductList from '../components/ProductList'
import {Button} from 'antd'


class Products extends Component {
  // static defaultProps {
  //
  // }
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: 'products/init',total:55})
  }

  handleDelete = (id) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'products/delete',
      payload: id,
      name:'michong'
    })
  }

  addList = () => {
    const {dispatch} = this.props;
    console.log('添加list')
    dispatch({type: 'products/addData'})
  }

  render() {
    const {products} = this.props;
    console.log('state:'+this.state)
    return (
      <div>
        <h2>List of Products</h2>
        <Button onClick={this.addList}>添加</Button>
        <ProductList onDelete={this.handleDelete} products={products}/>

      </div>
    )
  }
}


export default connect(({products}) => ({
  products,
}))(Products)
