import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Button, Popconfirm, Table, Tag,Input,Icon,} from 'antd'
import Highlighter from 'react-highlight-words';

import '../routes/products.css'

// const ProductList = ({onDelete, products}) => {
class ProductList extends Component {

  //初始化
  state = {
    data: [],
    pagination: {
      current: 1
    },
    loading: false,
    page: 1,
    searchText: '',
  };

  //index为当前页码，pageSize为页面显示条数
  changePage = (index, pageSize) => {

    // const {dispatch} = this.props;
    // dispatch({
    //   type: 'products/changePage',
    //   index:index,
    //   pageSize:pageSize
    // })
  }

  //根据文件名称搜索
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{padding: 8}}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.props.handleSearch(selectedKeys, confirm)}
          style={{width: 188, marginBottom: 8, display: 'block'}}
        />
        <Button
          type="primary"
          onClick={() => this.props.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{width: 90, marginRight: 8}}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
    ),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({searchText: selectedKeys[0]});
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({searchText: ''});
  };

  render() {

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...this.getColumnSearchProps('name'),
    }, {
      title: '网络地址',
      dataIndex: 'url',
    }, {
      title: '上传时间',
      dataIndex: 'createtime',
      defaultSortOrder: 'descend',
      key: 'createtime',
      sorter: (a, b) => Date.parse(a.createtime) - Date.parse(b.createtime)
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
      <Table dataSource={this.props.products} columns={columns} rowKey={record => record.id} style={{width: 1200}}
             pagination={{  // 分页
               //simple: true,
               // current: this.state.current,
               // total: this.state.total2,
               showSizeChanger: true,  //是否显示可以设置几条一页的选项
               // onChange: this.changePage,
               onChange: this.changePage,   //  页码改变的回调，参数是改变后的页码及每页条数
               total: total,
               // pageSize: 5
               bordered: true,
               loading:this.state.loading
             }} onChange={this.props.handleTableChange}>
      </Table>
    );
  }


};

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  handleTableChange: PropTypes.func.isRequired,
  handleSearch:PropTypes.func.isRequired
  // current: PropTypes.number.isRequired,
};

export default ProductList;
