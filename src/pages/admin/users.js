import React, { useState, useRef } from 'react';
import { Button, Card, Modal, Input } from 'antd';
import {fetch} from 'whatwg-fetch';
import AdminHeader from 'components/admin-header';
import { MixedTable, Form } from './smart-page';
import Select from './components/select';


const columns = (updateRule) => [
    {title: '用户登录名', dataIndex: 'login', width: 200},
    {title: '用户角色', dataIndex: 'rule', render: (text)=> <span>{{0: '普通用户', 1: 'vip用户', 2: '管理员', 3: '超级管理员'}[text]}</span>},
    {title: '创建时间', dataIndex: 'createdAt'},
    {title: '操作', dataIndex: 'id', render: (text, record)=> <Button type='primary' size='small' onClick={()=> updateRule(record)}>修改</Button>}
];

const formItems = [
    {name: '登录名', key: 'login', type: Input}
];

export default ()=> {
    const [ruleModal, setRuleModal] = useState(false);
    const [ruleItems, setRuleItems] = useState([
        {name: '用户名', key: 'login', type: Input, disabled: true},
        {name: '角色', key: 'rule', type: Select, options: [{name: '普通角色', value: 0}, {name: 'vip角色', value: 1}, {name: '管理员角色', value: 2}]},
    ]);
    const ruleModalRef = useRef()
    const filterRef = useRef()
    const tableRef = useRef()

    const list = (query)=> {
        return fetch(`/api/admin/user/list`, {
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
    
    const submitUpdate = ()=> {
        const formData = ruleModalRef.current.getValue();
        return fetch(`/api/admin/user/update`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }).then(res=> res.json())
        .then(json=> {
            tableRef.current.Refresh();
            Modal.info({title: '修改成功！'});
            setRuleModal(false);
        });
    }

    const updateRule = ({login, rule})=> {
        setRuleItems(x=> {
            const a = [].concat(x);
            a[0].defaultValue = login;
            a[1].defaultValue = rule;
            return a;
        });
        setRuleModal(true);
    }

    console.log('ruleItems', ruleItems)
    return (
        <div>
        <AdminHeader active='users' />
        <Card title="用户列表" bordered={false}>
            <Modal visible={ruleModal} onOk={submitUpdate} onCancel={()=> setRuleModal(false)} okText='确定' cancelText='取消'>
                <Form formItems={ruleItems} columnSize={1} ref={ruleModalRef} style={{marginTop: '30px'}}/>
            </Modal>
            <Form formItems={formItems} ref={filterRef} />
            <Button type='primary' size='small' style={{marginRight: '10px', marginLeft: '500px'}} onClick={search}>搜索</Button>
            <MixedTable ref={tableRef} request={list} pageNumField='pageNum' pageSizeField='pageSize' columns={columns(updateRule)} />
        </Card>
        </div>
    );
}