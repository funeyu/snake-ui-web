import React from 'react';
import { Table } from 'antd';
import BaseComponent from './BaseComponent';

/**
 * mixed table 混合skipable 和selectable的属性
 * table 里的查询条件：
 * 一般查询条件可以通过props传递进来，然后table通过监听props变换来进行请求
 * 但是这里我不这样做，上面这种做根据以往的经验会把table的组件周期函数弄乱，
 * 1. 这里外层首次传递来的查询条件放在this.queryParams下
 * 2. 通过暴露一个search函数来直接管理params和查询，尽量保证table组件自己管理自己
 */

export default class MixedTable extends BaseComponent {
  constructor(props) {
    super(props);
    this.pageSize = 10;
    this.state = {
      current: 1, // 当前页数
      loading: false
    };
    this.queryParams = this.props.queryParams || {};

    // 如果设置table前置可选
    if(props.selectable) {
      this.__initSelect();
    }
  }

    __initSelect=() => {
      this.selectedRowKeys = [];
      this.selectedItems = [];
    }

    __formatPage=(pageNumber) => {
      const { pageNumField, pageSizeField } = this.props;
      const {pageSize} = this;
      const res = {};
      if (pageNumField.includes('.') && pageSizeField.includes('.')) {
        const [page, numField] = pageNumField.split('.');
        // eslint-disable-next-line
            const [_, sizeField] = pageSizeField.split('.');
        res[page] = {
          [numField]: pageNumber,
          [sizeField]: pageSize
        };
        return res;
      }

      return {
        [pageNumField]: pageNumber,
        [pageSizeField]: pageSize
      };
    }

    getValue() {
      return {
        state: this.state,
        queryParams: this.props.queryParams
      };
    }

    fetchData(params) {
      const { request } = this.props;
      return request(params).then(({ dataSource, total, data }) => {
        this.setState({
          dataSource, total
        });

        return data;
      });
    }

    componentDidMount() {
      let { queryParams, ReactID } = this.props;
      if (typeof ReactID !== 'undefined' && typeof window[ReactID] !== 'undefined') {
        this.unFrozen();
        return;
      }

      const pageQuery = this.__formatPage(1);
      queryParams = Object.assign({}, queryParams || {}, pageQuery);
      this.fetchData(queryParams);
    }

    /**
     * Table 只冻住params 和 页码,  只有在后端支持分页的情况下使用
     */
    Frozen() {
      const { ReactID, isPaginationOff } = this.props;
      if (isPaginationOff) {
        return ;
      }
      const { current } = this.state;
      if (typeof ReactID === 'undefined') {
        throw new Error('Table should contain the prop: ReactID!');
      }
      window[ReactID] = {
        state: {
          current
        },
        queryParams: this.queryParams
      };
    }

    unFrozen() {
      const { ReactID } = this.props;
      const data = window[ReactID];
      // 用完一次就销毁
      delete window[ReactID];

      if (data.state) {
        this.setState(data.state);
      }
      this.queryParams = data.queryParams;
      this.fetchData(data.queryParams);
    }

    onPageChange=(page) => {
      this.setState({
        current: page
      });
      const pageQuery = this.__formatPage(page);
      const params = Object.assign({}, this.props.queryParams, this.queryParams, pageQuery);
      this.fetchData(params);
    }

    /**
     * 1. 外界调用搜索用的，页数一定要从1开始
     * 2. 每次调用都将之前的selectable 选项至于空；
     *  */
    Search(params) {
      this.setState({
        current: 1
      });
      this.queryParams = params;

      const pageQuery = this.__formatPage(1);
      const paramsObj = Object.assign({}, this.props.queryParams, params, pageQuery);

      if(this.props.selectable) {
        this.__initSelect();
      }
      return this.fetchData(paramsObj);
    }

    /**
     * 当前条件下（所有的条件都不变，包括分页条件）刷新请求一次
     * 重置selectable选项
     */
    Refresh() {
      const pageQuery = this.__formatPage(this.state.current);
      const paramsObj = Object.assign({}, this.props.queryParams, this.queryParams, pageQuery);
      if(this.props.selectable) {
        this.__initSelect();
      }
      return this.fetchData(paramsObj);
    }

    onSelectChange = (selectedRowKeys, ...args) => {
      this.selectedRowKeys = selectedRowKeys;
      const {rowKey} = this.props;
      const selectedItems = [];
      const compItems = this.selectedItems.concat(... args);
      for(let key of selectedRowKeys) {
        selectedItems.push(
          compItems.find(item => item[rowKey] === key)
        );
      }
      this.props.onSelectChange && this.props.onSelectChange(selectedItems);
      this.selectedItems = selectedItems;
      this.setState({});
    }

    SelectedItems = () => {
      return this.selectedItems;
    }

    onShowSizeChange = (current, size)=> {
      const {total} = this.state;
      let realCurrent;
      if(size * current > total) {
        realCurrent = Math.floor(total / size) + 1;
      } else {
        realCurrent = current;
      }

      this.pageSize = size;
      this.setState({
        current: realCurrent
      });

      const pageQuery = this.__formatPage(realCurrent);
      const paramsObj = Object.assign({}, this.props.queryParams, this.queryParams, pageQuery);

      if(this.props.selectable) {
        this.__initSelect();
      }
      return this.fetchData(paramsObj);
    }

    render() {
      const { dataSource, loading} = this.state;
      const { pageSize } = this;
      //eslint-disable-next-line
      let { renderHeader, rowSelection = {}, renderFooter, columns, selectable, request, rowKey, isPaginationOff, ...otherProps } = this.props;

      if (selectable) {
        rowSelection = Object.assign(rowSelection, {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        });
        otherProps.rowSelection = rowSelection;
      }

      return <div>
        {
          renderHeader && renderHeader(dataSource)
        }
        {
          isPaginationOff ? <Table
            columns={columns} {...{ dataSource, loading }}
            {... otherProps}
            rowKey={rowKey}
            scroll={{ x: 1200 }}
            pagination={{pageSize}}
          /> : <Table
            columns={columns} {...{ dataSource, loading }}
            {... otherProps}
            rowKey={rowKey}
            scroll={{ x: 1200 }}
            pagination={{
              // pageSizeOptions: [10, 20, 50, 100],
              showTotal: total => `共${total}条记录`,
              pageSize,
              // showSizeChanger: true,
              total: this.state.total,
              current: this.state.current,
              // showQuickJumper: true,
              // onShowSizeChange: this.onShowSizeChange,
              onChange: this.onPageChange
            }}
          />
        }

        {
          renderFooter && renderFooter()
        }
      </div>;
    }
}
