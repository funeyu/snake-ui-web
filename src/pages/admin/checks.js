import React, { useState, useRef } from 'react';
import { Button, Card, Modal, Input } from 'antd';
import AdminHeader from 'components/admin-header';
import {fetch} from 'whatwg-fetch';
import { MixedTable, Form } from './smart-page';

const columns = ({check}) => [
    {title: '博客地址', dataIndex: 'url', width: 600, render:(text)=> <a href={text} target='_blank'>{text}</a>},
    {title: '是否为博客', dataIndex: 'isBlog', render:(text)=>({0: '未审核', 1:'是', 2: '不是'}[text]) },
    {title: '新建时间', dataIndex: 'createdAt'},
    {title: '操作', dataIndex: 'id', render: (text, record)=> {
        if(record.isBlog === 0) {
            return [
                <Button type='primary'  key='confirm' size='small' onClick={()=> check(record.id, true)}>是博客</Button>, 
                <Button type='primary' key='cancel' size='small' style={{marginLeft: '10px'}} onClick={()=> check(record.id, false)}>不是博客</Button>
            ];
        }
        return <div />
        }
    }
];

const formItems = [
    {name: '书名', key: 'name', type: Input}
];

const addItems = [
    {name: '书名', key: 'name', type: Input, disabled: true},
    {name: '购买链接', key: 'buyUrl', type: Input, rules: ['require']},
    {name: '封面url', key: 'picUrl', type: Input, rules: ['require']}
]

export default ()=> {
    const [addModal, setAddModal] = useState(false);
    const addModalRef = useRef()
    const filterRef = useRef()
    const tableRef = useRef()

    const list = (query)=> {
        return fetch(`/api/admin/check/list`, {
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

    const check = (id, isBlog)=> {
        return fetch(`/api/admin/check/confirm`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, isBlog})
        }).then(res=> res.json())
        .then(json=> {
            const { code, msg } = json;
            if(code !== 10000) {
                Modal.error({title: msg});
            } else {
                Modal.info({title: '审核成功!'});
                tableRef.current.Refresh();
            }
        })
    }

    return (
        <div>
            <AdminHeader active='checks' />
            <Card title="博客审核列表" bordered={false}>
                <Form formItems={formItems} ref={filterRef} />
                <Button type='primary' style={{marginRight: '10px', float: 'right'}} onClick={search}>搜索</Button>
                <MixedTable ref={tableRef} request={list} pageNumField='pageNum' pageSizeField='pageSize' columns={columns({check})} />
            </Card>
        </div>
    );
}