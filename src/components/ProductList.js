import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Button, Popconfirm, Table, Tag} from 'antd'


// const ProductList = ({onDelete, products}) => {
class ProductList extends Component {

  //初始化
  state = {
    data: [],
    pagination: {},
    loading: false,
    page: parseInt(window.location.hash.slice(1), 0) || 1 //获取当前页面的hash值，转换为number类型
  };

  changePage = (pagination, filters, sorter) => {
    const pager = {...this.state.pagination};
    const current = pagination.current

    console.log('切换页码：' + this.state.page)
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
          state === '1' ? <Tag color='green'>存在</Tag> : <Tag color='volcano'>丢失</Tag>
        }
      </span>
      ),
    },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <Popconfirm title='Delete?' onConfirm={() => this.props.onDelete(record.id)}>
              <Button>Delete</Button>
            </Popconfirm>
          )
        }
      }]


    const {total} = this.props
    return (
      <Table dataSource={this.props.products} columns={columns} rowKey={record => record.id}
             pagination={this.state.pagination}
             pagination={{  // 分页
               //simple: true,
               // current: this.state.current,
               // total: this.state.total2,
               showSizeChanger: true,  //是否显示可以设置几条一页的选项
               // onChange: this.changePage,
               onChange: (pageNum, pageSize) => this.onPaginationChange({ pageNum, pageSize }),   //  页码改变的回调，参数是改变后的页码及每页条数
               total: total,
               // pageSize: 5
             }}>

      </Table>
    );
  }


};

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  // current: PropTypes.number.isRequired,
};

export default ProductList;
