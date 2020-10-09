import React, { useState, useEffect, useRef} from 'react';
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
    const [searchFocus, updateFocus] = useState(false);
    const [eyePosition, updateEyePosition] = useState({x:0, y:0});
    const focusStateRef = useRef(false);

    const history = useHistory();
    useEffect(()=> {
      if(type && type !== t) {
        setType(type);
      }
    }, [type]);

    const mousemove = function(e) {
      if (focusStateRef.current) {
        return;
      }
      const { pageX, pageY } = e;
      // 中心点为：（1270， 310）
      console.log(pageX, pageY);
      const distance = Math.sqrt((pageX - 1270)**2 + (pageY - 310)**2);
      console.log(distance);
      const x = ((pageX - 1270) / distance) * 5;
      const y = ((pageY - 310) / distance) * 5;
      console.log('x, y', x, y);
      updateEyePosition({
        x, y
      });
    }

    useEffect(()=> {
      
      document.body.addEventListener("mousemove", mousemove);
    }, [])

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

    const onFocus = function() {
      updateEyePosition({x:0, y: 0});
      focusStateRef.current = true;
    }

    const onBlur = function() {
      focusStateRef.current = false;
    }

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
    
    return (
      <div>
        <div className='types'>
          <span className='type active'>电影</span>
          <span className='type'>电视</span>
          <span className='type'>动漫</span>
          <span className='type'>博客</span>
        </div>
        <div className='search'>
          <span className='area'>
            <input className='input' placeholder={Placeholders[t]} onKeyPress={enter} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
            {/* <span className='hotboard'>{Types[t]}<b className='dropdown'></b>
              <span className='hidden'>
                <span className='up'></span>
                <span className='one' onClick={()=> setType('movie')}>{t === 'movie' && renderDuiGou()}电影</span>
                <span className='one' onClick={()=> setType('tv')}>{t === 'tv' && renderDuiGou()}电视</span>
                <span className='one' onClick={()=> setType('animation')}>{t === 'animation' && renderDuiGou()}动漫</span>
                <span className='one' onClick={()=> setType('blog')}>{t === 'blog' && renderDuiGou()}博客</span>
              </span>
            </span> */}
            <input className='button' type='submit' value='搜搜一下' onClick={onSubmit} />
            <div className='eye'>
              <div id='inner' style={{transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`}}></div>
            </div>
            { t === 'blog' &&<span className='yblog' onClick={yAdd}>昨日新增<span className='icon'></span></span> }
          </span>
        </div>
      </div>
    )
}
