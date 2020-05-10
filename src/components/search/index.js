import React, { useState, } from 'react';
import { useHistory } from 'react-router-dom';
import './index.less';

export default ({keyword=''})=> {
    const [value, setValue] = useState(window.decodeURIComponent(keyword));
    const history = useHistory();

    const enter = function(event) {
      console.log('event', event.charCode);
      if (event.charCode === 13) {
        if (event.target.value) {
          history.push(`/search?keyword=${event.target.value}`);
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
      history.push(`/search?keyword=${value}`);
    }

    return <div className='search'>
      <span className='area'>
        <input className='input' onKeyPress={enter} value={value} onChange={onChange}/>
        <input className='button' type='submit' value='搜搜一下' onClick={onSubmit} />
      </span>
    </div>
}