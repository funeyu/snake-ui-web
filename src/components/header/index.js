import React, { useRef, useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Img from 'react-image';
import query from 'utils/query';
import Search from 'components/search';
import { traceEvent } from 'utils/ga';
import UserContext from 'contexts/user';
import earth from 'images/earth.png';
import logo from 'images/soso.png';
import './index.less';

export default ({active, showLogo})=> {
  const history = useHistory();
  const listenerRef = useRef();
  const [showProfile, updateShowProfile] = useState(false);
  const info = useContext(UserContext);
  const queryObj = query(useLocation());
 
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

  const login = function(url) {
    traceEvent('header', 'login', '');
    window.open(url);
  };

  return (
    <div className='header'>
      <div className='logo'>
        <img src={logo} alt='logo' onClick={()=> router('/')}/>
        <a className='domain' href="https://xiaoshesoso.com">www.xiaoshesoso.com</a>
      </div>
      <div className='container'>
      <Search {...queryObj} isHeader={true}/>
        <div className='user'>
        {
          // !info.logined ? <span className='login' href='' onClick={()=>login('/api/snake/github/') }>登录</span>
          //   : <div className='avatar'>
          //   <Img alt='avatar' onClick={setShowProfile} id='profile-avatar' src={[info.avatar]} 
          //     unloader={<img alt='avatar' src={earth} onClick={setShowProfile} id='profile-avatar'/>} 
          //   />
          //   <div className='dropdown' style={{display: showProfile ? 'block' : 'none'}}>
          //     <span className='tri'></span>
          //     <span className='link' onClick={()=> router('/profile')}>收藏<b>({info.collect})</b></span>
          //     <div role='none' className='line'></div>
          //     <span className='link' onClick={()=> router('/profile')}>点赞/踩<b>({info.star}/{info.unstar})</b></span>
          //   </div>
          // </div>
        }
        </div>
      </div>
  </div>
  )
}
