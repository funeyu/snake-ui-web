import React, { useState, useRef } from 'react';
import { Button, Card, Modal, Input } from 'antd';
import {fetch} from 'whatwg-fetch';
import AdminHeader from 'components/admin-header';
import { MixedTable, Form } from './smart-page';
import FormItem from 'antd/lib/form/FormItem';

const FormatUrl = function(record) {
  let schema = record.schema === 1 ? 'https://' : 'http://';
  return `${schema}${record.domain}${record.path}`;
}
const columns = ({del}) => [
    {title: '域名', dataIndex: 'domain', width: 600, render:(text, record)=> <a href={FormatUrl(record)} target='_blank'>{text}</a>},
    {title: '速度(秒)', dataIndex: 'speed', render: (text)=> text / 1000},
    {title: 'github followers数', dataIndex: 'gitFollowers'},
    {title: '操作', dataIndex: 'id', render: (text, record)=> <Button type='primary' size='small' onClick={()=> del(record)}>删除</Button>}
];

const formItems = [
    {name: '域名', key: 'domain', type: Input}
];

const addItems = [
    {name: '域名', key: 'domain', type: Input, rules: ['require']},
    {name: '速度（毫秒数)', key: 'speed', type: Input},
    {name: 'github star数', key: 'star', type: Input}
]

export default ()=> {
    const [addModal, setAddModal] = useState(false);
    const addModalRef = useRef()
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

  return (
    <div>
      <AdminHeader active='blogs' />
      <Card title="博客列表" bordered={false}>
        <Modal visible={addModal} onOk={submitAdd} onCancel={()=> setAddModal(false)}>
          <Form formItems={addItems} columnSize={1} ref={addModalRef} />
        </Modal>
        <Form formItems={formItems} ref={filterRef} />
        <Button type='primary' size='small' style={{marginRight: '10px', marginLeft: '500px'}} onClick={search}>搜索</Button>
        <Button type='primary' size='small' onClick={()=> setAddModal(true)}>添加</Button>
        <MixedTable ref={tableRef} request={list} pageNumField='pageNum' pageSizeField='pageSize' columns={columns({del})} />
      </Card>
    </div>
  );
}