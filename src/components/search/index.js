import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { traceEvent } from 'utils/ga';
import './index.less';

const Placeholders = {
  'movie': '全网搜索电影',
  'tv': '全网搜索电视剧,追剧,免费看',
  'animation': '全网搜番,动漫随心看',
  'blog': '搜索千万个人博客，寻找有趣思想',
  'tool': '搜索好用的工具， 让你工作效率嗖嗖的',
  'hot': '搜索热搜榜，这里有互联网人的记忆',
};
const Types = {
  'blog': '博客', 'movie': '电影', 'tv': '电视', 'animation': '动漫'
};

export default ({keyword='', type})=> {
    const [value, setValue] = useState(window.decodeURIComponent(keyword));
    const [t, setType] = useState('movie');

    const history = useHistory();
    useEffect(()=> {
      if(type && type !== t) {
        setType(type);
      }
    }, [type]);

    const enter = function(event) {
      if (event.charCode === 13) {
        if (event.target.value) {
          traceEvent('search', 'enter', event.target.value);
          history.push(`/search?keyword=${event.target.value}&type=${t}&timestamp=${Math.ceil(+ new Date() / 3000)}`);
        } else {
          history.push('/');
        }
      }
    };

    const onChange = function(event) {
      setValue(event.target.value);
    };

    const onSubmit = function(event) {
      if(!value) {
        return history.push('/');
      }
      traceEvent('search', 'click', value);
      history.push(`/search?keyword=${value}&type=${t}&timestamp=${Math.ceil(+ new Date() / 3000)}`);
    };

    const yAdd = function() {
      history.push(`/yesterday?type=${t}`);
    };

    const renderDuiGou = function() {
      return <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>
    }
    console.log('t', t)
    return (
      <div className='search'>
        <span className='area'>
          <input className='input' placeholder={Placeholders[t]} onKeyPress={enter} value={value} onChange={onChange} />
          <span className='hotboard'>{Types[t]}<b className='dropdown'></b>
            <span className='hidden'>
              <span className='up'></span>
              <span className='one' onClick={()=> setType('movie')}>{t === 'movie' && renderDuiGou()}电影</span>
              <span className='one' onClick={()=> setType('tv')}>{t === 'tv' && renderDuiGou()}电视</span>
              <span className='one' onClick={()=> setType('animation')}>{t === 'animation' && renderDuiGou()}动漫</span>
              <span className='one' onClick={()=> setType('blog')}>{t === 'blog' && renderDuiGou()}博客</span>
            </span>
          </span>
          <input className='button' type='submit' value='搜搜一下' onClick={onSubmit} />
          { t === 'blog' &&<span className='yblog' onClick={yAdd}>昨日新增<span className='icon'></span></span> }
        </span>
      </div>
    )
}
