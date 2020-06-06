import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

export default ({onChange, value, options, ...rest})=> {
    return <Select value={value}
        placeholder="请选择"
        onChange={onChange}
        {...rest}
    >
        {
            options.map(o=> <Option value={o.value}>{o.name}</Option>)
        }
    </Select>
}