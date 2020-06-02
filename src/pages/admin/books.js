import React, { useState, useRef } from 'react';
import { Button, Card, Modal, Input } from 'antd';
import AdminHeader from 'components/admin-header';
import {fetch} from 'whatwg-fetch';
import { MixedTable, Form } from './smart-page';

const columns = ({update}) => [
    {title: '书名', dataIndex: 'name', width: 600},
    {title: '笔记数', dataIndex: 'notesNum'},
    {title: '购买地址', dataIndex: 'buyUrl', render: (text)=> text ? <a href={text}>{text}</a> : '暂无'},
    {title: '封面地址', dataIndex: 'picUrl', render: (text)=> text ? <img src={text} style={{width: '120px'}} alt='picUrl' /> : '暂无'},
    {title: '操作', dataIndex: 'id', render: (text, record)=> <Button type='primary' size='small' onClick={()=> update(record)}>修改</Button>}
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
        return fetch(`/api/admin/book/list`, {
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

    const update = (record)=> {
        addItems[0].value = record.name;
        console.log('addItems', addItems);
        return Modal.confirm({
            title: '修改',
            content: <Form formItems={addItems} columnSize={1} ref={addModalRef} />,
            okText: '确定', cancelText: '取消',
            onOk:  ()=> {
                const formData = addModalRef.current.getValue();
                if (formData) {
                    return fetch(`/api/admin/book/update`, {
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

    return (
        <div>
            <AdminHeader active='books' />
            <Card title="书本列表" bordered={false}>
                <Form formItems={formItems} ref={filterRef} />
                <Button type='primary' size="small" style={{marginRight: '10px', float: 'right'}} onClick={search}>搜索</Button>
                <MixedTable ref={tableRef} request={list} pageNumField='pageNum' pageSizeField='pageSize' columns={columns({update})} />
            </Card>
        </div>
    );
}