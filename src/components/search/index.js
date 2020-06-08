import React, { useState, } from 'react';
import { useHistory } from 'react-router-dom';
import { traceEvent } from 'utils/ga';
import './index.less';

export default ({keyword=''})=> {
    const [value, setValue] = useState(window.decodeURIComponent(keyword));
    const history = useHistory();

    const enter = function(event) {
      if (event.charCode === 13) {
        if (event.target.value) {
          traceEvent('search', 'enter', event.target.value);
          history.push(`/search?keyword=${event.target.value}&timestamp=${Math.ceil(+ new Date() / 3000)}`);
        } else {
          history.push('/');
        }
      }
    }

    const onChange = function(event) {
      setValue(event.target.value);
    }

    const onSubmit = function(event) {
      if(!value) {
        return history.push('/');
      }
      traceEvent('search', 'click', value);
      history.push(`/search?keyword=${value}&timestamp=${Math.ceil(+ new Date() / 3000)}`);
    }

    return (
      <div className='search'>
        <span className='area'>
          <input className='input' placeholder='搜索千万个人博客，寻找有趣思想' onKeyPress={enter} value={value} onChange={onChange} />
          <input className='button' type='submit' value='搜搜一下' onClick={onSubmit} />
        </span>
      </div>
    )
}