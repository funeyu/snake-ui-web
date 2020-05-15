import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Img from 'react-image';
import UserInfoHook from 'hooks/userInfoHook';
import earth from 'images/earth.png';
import './index.less';

export default ()=> {
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

  return (
    <div className='header'>
        <div className='container'>
          <div className='links'>
              <span onClick={()=> alert('待开发！')}>收录博客</span>
              <span onClick={()=> window.location.href = 'https://gohugo.io/'}>搭建博客工具</span>
              <span href='/#'>功能建议</span>
          </div>
          <div className='user'>
          {
            !info.logined ? <a className='login' href='/api/snake/github/'>通过github登录</a>
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