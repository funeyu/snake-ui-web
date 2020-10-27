import React, { useState, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { traceEvent } from 'utils/ga';
import isPhone from 'utils/isPhone';
import weixin from 'images/weixin.png';
import './index.less';

const Placeholders = {
  'movie': '全网搜索电影',
  'tv': '全网搜索电视剧,追剧,免费看',
  'animation': '全网搜番,动漫随心看',
  'blog': '搜索千万个人博客，寻找有趣思想',
  'book': '搜索书籍,提供相应的下载链接',
  'tool': '搜索好用的工具， 让你工作效率嗖嗖的',
  'hot': '搜索热搜榜，这里有互联网人的记忆',
  'site': '搜索小众有趣的网站，带你去看互联网世界'
};
const Types = {
  'blog': '博客', 'movie': '电影', 'tv': '电视', 'animation': '动漫', 'book': '书籍', 'site': '网页'
};

export default ({keyword='', type, isHeader, changeHot})=> {
    const [value, setValue] = useState(window.decodeURIComponent(keyword));
    const [t, setType] = useState('movie');
    const [modal, updateModal] = useState(false);
    const [searchFocus, updateFocus] = useState(false);
    const [eyePosition, updateEyePosition] = useState({x:0, y:0});
    const focusStateRef = useRef(false);

    const history = useHistory();

    useEffect(()=> {
      if(keyword) {
        focusStateRef.current = true;
      }
    }, [keyword]);

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

    const renderDuiGou = function() {
      return <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>
    }

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
    
    const changeType = function(type) {
      setType(type);
      changeHot(type);
    }

    const askConfirm = function() {
      const { email, title} = window;
      fetch(`/api/snake/search/ask`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, title})
      }).then(res=> res.json())
        .then(data=> {
          if (data.code === 10000) {
            alert('操作成功！');
            updateModal(false);
          } else {
            alert(data.msg || '操作失败！');
          }
        });
    }

    const askInput = function(type, e) {
      window[type] = e.target.value;
    }

    const isInPhone = isPhone();
    console.log('isInPhone', isInPhone);
    return (
      <div>
        {
          !isHeader ? (
            <div className='types'>
              <span className={`${t=='movie' ? 'type active': 'type'}`} onClick={()=> changeType('movie') }>电影</span>
              <span className={`${t=='tv' ? 'type active': 'type'}`} onClick={()=> changeType('tv')}>电视</span>
              <span className={`${t=='animation' ? 'type active': 'type'}`} onClick={()=> changeType('animation')}>动漫</span>
              <span className={`${t=='site' ? 'type active': 'type'}`} onClick={()=> changeType('site')}>网页<span style={{fontSize: '10px'}}>临时开放</span></span>
              <span className={`${t=='book' ? 'type active': 'type'}`} onClick={()=> changeType('book')}>书籍</span>
              <span className={`${t=='blog' ? 'type active': 'type'}`} onClick={()=> changeType('blog')}>博客</span>
              <span className='type one active' onClick={()=> updateModal(true)}>
                <span className='iconfont icon-hot'></span>
                <span>加我好友</span>
              </span>
            </div>
          ): null
        }
        
        <div className='search'>
          <Modal isOpen={modal}>
            <div className='ask'>
              <h2 style={{color: '#2DCF62'}}>扫一扫，添加好友，入群讨论搜索，资源共享，功能反馈</h2>
              <img style={{width: '360px'}} src={weixin} />
              <button style={{color: '#333'}} onClick={()=> updateModal(false)}>关闭</button>
            </div>
          </Modal>
          <span className='area'>
            <input className='input' placeholder={Placeholders[t]} onKeyPress={enter} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
            {
              isHeader ? (
                <span className='hotboard'>{Types[t]}<b className='dropdown'></b>
                  <span className='hidden'>
                    <span className='up'></span>
                    <span className='one' onClick={()=> setType('movie')}>{t === 'movie' && renderDuiGou()}电影</span>
                    <span className='one' onClick={()=> setType('tv')}>{t === 'tv' && renderDuiGou()}电视</span>
                    <span className='one' onClick={()=> setType('animation')}>{t === 'animation' && renderDuiGou()}动漫</span>
                    <span className='one' onClick={()=> setType('site')}>{t === 'site' && renderDuiGou()}网页</span>
                    <span className='one' onClick={()=> setType('book')}>{t === 'book' && renderDuiGou()}书籍</span>
                    <span className='one' onClick={()=> setType('blog')}>{t === 'blog' && renderDuiGou()}博客</span>
                  </span>
                </span>
              ) : null
            }
            <input className='button' type='submit' value={`${isInPhone ? '搜搜' : '搜搜一下'}`} onClick={onSubmit} />
            <div className='eye'>
              <div id='inner' style={{transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`}}></div>
            </div>
            { t === 'blog' &&<span className='yblog' onClick={yAdd}>昨日新增<span className='icon'></span></span> }
          </span>
        </div>
      </div>
    )
}
