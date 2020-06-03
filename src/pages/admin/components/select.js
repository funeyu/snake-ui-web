import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

export default ({onChange, value, options})=> {
    return <Select value={value}
        placeholder="请选择"
        onChange={onChange}
    >
        {
            options.map(o=> <Option value={o.value}>{o.name}</Option>)
        }
    </Select>
}