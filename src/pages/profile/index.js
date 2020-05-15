import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Img from 'react-image';
import {fetch} from 'whatwg-fetch';
import ListItem from 'components/list-item';
import soso from '../../images/soso.png';
import earth from 'images/earth.png';
import './index.less';
export default ()=> {
  const history = useHistory();
  const [blogs, updateBlogs] = useState([]);
  const [type, updateType] = useState(1);

  const goHome = ()=> {
    history.push('/');
  };

  const api = function(type) {    
    fetch(`/api/snake/search/op/list?type=${type}`)
      .then((response)=> response.json())
      .then(function(res) {
        updateBlogs(res.data);
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  };
  
  useEffect(()=> {
    api(1);
  }, []);

  const changeType = (type)=> {
    updateType(type);
    api(type);
  };
  return <div className='nav'>
    <aside className='aside'>
      <img className='logo' src= {soso} alt='soso' onClick={goHome}/>
      <div className='user'>
        <Img alt='avatar' src={['https://avatars3.githubusercontent.com/u/9313910?v=4&s=120']} unloader={<img alt='avatar' src={earth} />} />
        <p className='name'>funeyu</p>
      </div>
    </aside>
    <main className='main'>
      <div className='selection'>
        <span className={type === 1 ? 'selected' : ''} onClick={()=> changeType(1)}><span className='iconfont icon-attachent'></span>收藏的博客</span>
        <span className={type === 2 ? 'selected' : ''} onClick={()=> changeType(2)}><span className='iconfont icon-good'></span>喜欢的博客</span>
        <span className={type === 3 ? 'selected' : ''} onClick={()=> changeType(3)}><span className='iconfont icon-good notgood'></span>踩的博客</span>
      </div>
      {
        <ul className='result'>
          {
            blogs && blogs.map((l,index)=> <ListItem mode='profile' l={l} />)
          }
        </ul>
      }
    </main>
  </div>
}