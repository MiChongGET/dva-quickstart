import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {Button, Popconfirm, Table, Tag} from 'antd'


// const ProductList = ({onDelete, products}) => {
class ProductList extends Component{


  changePage(){

  }

  render() {

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: '网络地址',
      dataIndex: 'url'
    }, {
      title: '上传时间',
      dataIndex: 'createtime'
    }, {
      title: '文件大小',
      dataIndex: 'size'
    }, {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      render: state => (
        <span>{
          state ==='1'?<Tag color='green'>存在</Tag>:<Tag color='volcano'>丢失</Tag>
        }

      </span>
      ),
    },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <Popconfirm title='Delete?' onConfirm={() =>this.props.onDelete(record.id)}>
              <Button>Delete</Button>
            </Popconfirm>
          )
        }
      }]


    return (
      <Table dataSource={this.props.products} columns={columns} rowKey={record => record.id} pagination={{pageSize: 5 }}
             pagination={{  // 分页
               simple: true,
               // current: this.state.current,
               // total: this.state.total2,
               onChange: this.changePage,
             }}>

      </Table>
    );
  }


};

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList;
