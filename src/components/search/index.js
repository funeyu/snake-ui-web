import React, { useState, } from 'react';
import { useHistory } from 'react-router-dom';
import ga from 'utils/ga';
import './index.less';

export default ({keyword=''})=> {
    const [value, setValue] = useState(window.decodeURIComponent(keyword));
    const history = useHistory();

    const enter = function(event) {
      if (event.charCode === 13) {
        if (event.target.value) {
          ga('search', 'enter', event.target.value);
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
      ga('search', 'click', value);
      history.push(`/search?keyword=${value}&timestamp=${Math.ceil(+ new Date() / 3000)}`);
    }

    return (
      <div className='search'>
        <span className='area'>
          <input className='input' onKeyPress={enter} value={value} onChange={onChange} />
          <input className='button' type='submit' value='搜搜一下' onClick={onSubmit} />
        </span>
      </div>
    )
}