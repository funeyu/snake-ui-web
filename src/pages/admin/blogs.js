import React, { useState, useRef } from 'react';
import { Button, Card, Modal, Input } from 'antd';
import {fetch} from 'whatwg-fetch';
import AdminHeader from 'components/admin-header';
import { MixedTable, Form } from './smart-page';
import Select from './components/select';

const FormatUrl = function(record) {
  let schema = record.schema === 1 ? 'https://' : 'http://';
  return `${schema}${record.domain}${record.path}`;
}
const columns = ({update, del}) => [
    {title: 'git 登录名', dataIndex: 'gitLogin'},
    {title: '域名', dataIndex: 'domain', width: 600, render:(text, record)=> <a href={FormatUrl(record)} target='_blank'>{text}</a>},
    {title: 'schema', dataIndex: 'schema', render:(text)=> text === 1 ? 'https': 'http'},
    {title: '博客路径', dataIndex: 'path'},
    {title: '排名信息', dataIndex: 'rankId', render: (text, record)=> <span>rankId:{record.rankId}; subRankId: {record.subRankId}</span>},
    {title: 'github followers数', dataIndex: 'gitFollowers'},
    {title: '操作', dataIndex: 'id', 
      render: (text, record)=> {
        return [
          <Button type='primary' style={{margin: '0 10px 10px 0'}} size='small' onClick={()=> update(record)}>修改</Button>,
          <Button type='primary' size='small' onClick={()=> del(record)}>删除</Button>
        ]
      }
    }
];

const formItems = [
    {name: '域名', key: 'domain', type: Input},
    {name: '语言', key: 'lang', type: Select, options: [{name: '未知', value: 0}, {name: '中文', value: 1}, {name: '外文', value: 2}]}
];

const addItems = [
    {name: '域名', key: 'domain', type: Input, rules: ['require']},
    {name: '速度（毫秒数)', key: 'speed', type: Input},
    {name: 'github star数', key: 'star', type: Input}
];

const updateItems = [
  {name: '域名', key: 'domain', type: Input},
  {name: '域名schema', key: 'schema', type: Select, options: [{name: 'http', value: 0}, {name:'https', value: 1}]},
  {name: '博客路径',key: 'path',  type: Input},
  {name: 'git的登录名', key: 'gitLogin', type: Input},
  {name: '语言', key: 'lang', type: Select, options: [{name: '未知', value: 0}, {name: '中文', value: 1}, {name: '外文', value: 2}]}
];

export default ()=> {
    const [addModal, setAddModal] = useState(false);
    const addModalRef = useRef()
    const updateModalRef = useRef()
    const filterRef = useRef()
    const tableRef = useRef()

    const submitAdd = ()=> {
        const formData = addModalRef.current.getValue();
        return fetch(`/api/admin/blog/create`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }).then(res=> res.json())
        .then(json=> {
            const {code, msg} = json;
            setAddModal(false);
            if (code === 10000) {
                Modal.info({title: '添加成功！'})
            } else {
                Modal.error({title: '添加失败！'})
            }
        });
    }

    const list = (query)=> {
        return fetch(`/api/admin/blog/list`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(query)
        }).then(res=> res.json())
        .then(json=> {
        const data = json.data;
        return {
            total: data.total,
            dataSource: data.items
        }
        });
  };

  const search = ()=> {
    const formData = filterRef.current.getValue();
    tableRef.current.Search({query: formData});
  }

  const del = (record)=> {
    return fetch(`/api/admin/blog/delete`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: record.id})
    }).then(res=> res.json())
      .then(json=> {
        const { code, msg } = json;
        if(code !== 10000) {
          Modal.error({title: msg});
        } else {
          Modal.info({title: '删除成功!'});
          tableRef.current.Refresh();
        }
      })
  }

  const update = (record)=> {
    updateItems[0].value = record.domain;
    updateItems[1].value = record.schema;
    updateItems[2].value = record.path;
    updateItems[3].value = record.gitLogin;
    updateItems[4].value = record.lang;
    return Modal.confirm({
        title: '修改',
        content: <Form formItems={updateItems} columnSize={1} ref={updateModalRef} />,
        okText: '确定', cancelText: '取消',
        onOk:  ()=> {
            const formData = updateModalRef.current.getValue();
            if (formData) {
                return fetch(`/api/admin/blog/update`, {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(Object.assign(record, formData))
                }).then(res=> res.json())
                    .then(json=> {
                        const { code, msg } = json;
                        if(code !== 10000) {
                            Modal.error({title: msg});
                        } else {
                            Modal.info({title: '修改成功!'});
                            tableRef.current.Refresh();
                        }
                    })
                }
            }
        });
}
  
  const onReset = function() {
    filterRef.current.ResetFormdata();
  }

  return (
    <div>
      <AdminHeader active='blogs' />
      <Card title="博客列表" bordered={false}>
        <Modal visible={addModal} onOk={submitAdd} onCancel={()=> setAddModal(false)}>
          <Form formItems={addItems} columnSize={1} ref={addModalRef} />
        </Modal>
        <Form formItems={formItems} ref={filterRef} />
        <Button type='primary' size='small' style={{marginRight: '10px', marginLeft: '500px'}} onClick={search}>搜索</Button>
        <Button type='primary' size='small' style={{marginRight: '10px'}} onClick={onReset}>重置</Button>
        <Button type='primary' size='small' onClick={()=> setAddModal(true)}>添加</Button>
        <MixedTable ref={tableRef} request={list} pageNumField='pageNum' pageSizeField='pageSize' columns={columns({del, update})} />
      </Card>
    </div>
  );
}