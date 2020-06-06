import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Modal, Input } from 'antd';
import Select from './components/select';
import AdminHeader from 'components/admin-header';
import {fetch} from 'whatwg-fetch';
import { MixedTable, Form } from './smart-page';

const columns = ({update, del}) => [
    {title: '博文地址', dataIndex: 'url', width: 400, render:(text)=> <a href={text} target='_blank'>{text}</a>},
    {title: '博文title', dataIndex: 'title', width: 500},
    {title: '博文类型', dataIndex: 'type',
        render: (text, record)=> (
            <Select style={{width: 120}} value={text} options={[{name: '其他', value: 0}, {name: '技术', value: 1}, {name: '编程语言', value: 2}, {name: '工具', value: 3}, {name: '生活感悟', value: 4}, {name: '好文阅读', value: 5}]} 
            onChange={(value)=> {update(record.id, value)}}
            />
        )
    },
    {title: '操作', dataIndex: 'id', render: (text, record)=> {
        return <div>
            <Button type='primary' size='small' style={{margin: '0 4px'}} onClick={()=> del(record)}>删除</Button>
        </div>
        }
    }
];

const formItems = [
    {name: '博文类型', key: 'type', type: Select, options: [{name: '其他', value: 0}, {name: '技术', value: 1}, {name: '编程语言', value: 2}, {name: '工具', value: 3}, {name: '生活感悟', value: 4}, {name: '好文阅读', value: 5}]}
];

const addItems = [
    {name: '书名', key: 'name', type: Input, disabled: true},
    {name: '购买链接', key: 'buyUrl', type: Input, rules: ['require']},
    {name: '封面url', key: 'picUrl', type: Input, rules: ['require']}
]

export default ()=> {
    const addModalRef = useRef()
    const filterRef = useRef()
    const tableRef = useRef()
    const [total, updateTotal] = useState({})
    const list = (query)=> {
        return fetch(`/api/admin/yesterday/list`, {
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

    const update = (id, type)=> {
        return fetch(`/api/admin/yesterday/update`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, type})
        }).then(res=> res.json())
        .then(json=> {
            const { code, msg } = json;
            if(code !== 10000) {
                Modal.error({title: msg});
            } else {
                tableRef.current.Refresh();
            }
        })
    }

    const del = (record)=> {
        return fetch(`/api/admin/yesterday/delete`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: record.id})
        }).then(res=> res.json())
        .then(json=> {
            const { code, msg } = json;
            if(code !== 10000) {
                Modal.error({title: msg});
            } else {
                tableRef.current.Refresh();
            }
        })
    } 

    return (
        <div>
            <AdminHeader active='checks' />
            <Card title="昨日新增审核列表" bordered={false}>
                <Form formItems={formItems} ref={filterRef} />
                <Button type='primary' style={{marginLeft: '460px'}} size='small' onClick={search}>搜索</Button>
                <MixedTable ref={tableRef} style={{marginTop: '20px'}} request={list} pageNumField='pageNum' pageSizeField='pageSize' columns={columns({update, del})} />
            </Card>
        </div>
    );
}