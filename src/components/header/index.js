import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Input } from 'antd';
import Img from 'react-image';
import UserInfoHook from 'hooks/userInfoHook';
import earth from 'images/earth.png';
import './index.less';

export default ({active})=> {
  const history = useHistory();
  const listenerRef = useRef();
  const [showProfile, updateShowProfile] = useState(false);

  useEffect(()=> {
    return ()=> {
      document.removeEventListener('click', listenerRef.current, false);
    };
  }, []);

  if (!listenerRef.current) {
    listenerRef.current = function(event) {
      const id = event.target.getAttribute('id');
      if (id !== 'profile-avatar') { // 去除冒泡来自profile的元素
        updateShowProfile(x=>{
          if(x) { //只处理关闭动作
            return !x;
          }
          return x;
        });
      }
    };
  }

  const router = (path)=> {
    history.push(path);
  };

  const setShowProfile = ()=> {
    updateShowProfile(x=>{
      if (!x) { //要打开sort，这时要监听document上的点击事件，关闭showSort
        document.addEventListener('click', listenerRef.current, false);
      } else {
        document.removeEventListener('click', listenerRef.current, false);
      }
      return !x;
    });
  };
  
  const info = UserInfoHook();

  const record = function() {
    Modal.confirm({
      title: '请输入要填写的地址！',
      content: <Input />,
      okText: '确定',
    });
  }
  return (
    <div className='header'>
        <div className='container'>
          <div className='links'>
              <span className={active === 'yesterday' ? 'hot active' : 'hot'} onClick={()=> window.location.href = 'https://gohugo.io/'}>昨日新增博文<b className='num'></b></span>
              <span className={active === 'hot' ? 'hot active' : 'hot'} onClick={()=> window.location.href = 'https://gohugo.io/'}><b className='iconfont icon-hot hot'></b>热门博主</span>
              <span className={active === 'book' ? 'hot active' : 'hot'} onClick={()=> history.push('/book')}><b className='iconfont icon-good'></b><b className='tri'></b>好书推荐</span>
              <span onClick={record}>收录博客</span>
              <span onClick={()=> window.open("https://github.com/funeyu/snake-web-server/issues/1")}>功能建议</span>
          </div>
          <div className='user'>
          {
            !info.logined ? <a className='login' href='/api/snake/github/'>登录</a>
              : <div className='avatar'>
              <Img alt='avatar' onClick={setShowProfile} id='profile-avatar' src={[info.avatar]} 
                unloader={<img alt='avatar' src={earth} onClick={setShowProfile} id='profile-avatar'/>} 
              />
              <div className='dropdown' style={{display: showProfile ? 'block' : 'none'}}>
                <span className='tri'></span>
                <span className='link' onClick={()=> router('/profile')}>收藏<b>({info.collect})</b></span>
                <div role='none' className='line'></div>
                <span className='link' onClick={()=> router('/profile')}>点赞/踩<b>({info.star}/{info.unstar})</b></span>
              </div>
            </div>
          }
          </div>
      </div>
  </div>
  )
}