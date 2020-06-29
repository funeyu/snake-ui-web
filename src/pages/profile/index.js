import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Img from 'react-image';
import { fetch } from 'whatwg-fetch';
import ListItem from 'components/list-item';
import soso from '../../images/soso.png';
import earth from 'images/earth.png';
import './index.less';
export default ()=> {
  const history = useHistory();
  const [list, updateList] = useState([]);
  const [type, updateType] = useState('collects');

  const goHome = ()=> {
    history.push('/');
  };

  const api = function(type) {// type: 'follow'(follow动态), 'blog'(blog更新), 'opration(操作列表)'
                              // 'collects(收藏的博客)','followers'(关注的人), 'fans(关注您的人)'
    fetch(`/api/snake/search/op/list?type=${type}`)
      .then((response)=> response.json())
      .then(function(res) {
        updateList(res.data);
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  };
  
  useEffect(()=> {
    api('collects');
  }, []);

  const changeType = (type)=> {
    updateType(type);
    api(type);
  };

  // <img alt= 'avatar' src='https://avatars0.githubusercontent.com/u/7509240?s=64&v=4' />
  const renderItem = function(item) {
    if (type === 'collects') {
      return <li key={item.id}>
        <div className='body'>
          <div className='title'>您于{item.createdAt} 关注了博客</div>
          <div className='content'>
            <Img alt='avatar' src={[item.favicon]} unloader={<img alt='avatar' src={earth} />} />
            <div className='info'>
              <div className='login'><a href={item.url}>{item.url}</a></div>
              <div className='bio'>{item.keywords}</div>
              <div className='last-blog'>
                最近一篇文章：<a href={item.lastBlogUrl}>{item.lastBlogUrl}</a>
              </div>
            </div>
          </div>
        </div>
      </li>
    }
  }

  const comeSoon = function() {

  }
  return (
    <div className='profile'>
      <aside className='aside'>
        <div className='logo'>
          <img src= {soso} alt='soso' onClick={goHome}/>
        </div>
        <div className='user'>
          <Img alt='avatar' src={['https://avatars3.githubusercontent.com/u/9313910?v=4&s=120']} unloader={<img alt='avatar' src={earth} />} />
          <p className='name'>funeyu</p>
        </div>
      </aside>
      <main className='main'>
        <div className='selection'>
          
          <span className={type === 'operation' ? 'selected' : ''} onClick={()=> changeType('operation')}><span className='iconfont icon-good notgood'></span>操作列表</span>
          <span className={type === 'collects' ? 'selected' : ''} onClick={()=> changeType('collects')}><span className='iconfont icon-good notgood'></span>收藏的博客</span>
          <span className={type === 'follow' ? 'selected' : ''} onClick={comeSoon}><span className='iconfont icon-attachent'></span>follow动态</span>
          <span className={type === 'followers' ? 'selected' : ''} onClick={comeSoon}><span className='iconfont icon-good notgood'></span>关注的人</span>
          <span className={type === 'fans' ? 'selected' : ''} onClick={comeSoon}><span className='iconfont icon-good notgood'></span>关注您的人</span>
        </div>
        <ul className='feeds'>
          {
            list && list.map(l=> renderItem(l))
          }
        </ul>
      </main>
    </div>
  );
}
