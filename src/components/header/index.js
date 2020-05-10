import React from 'react';

import './index.less';
import { useHistory } from 'react-router-dom';

export default ()=> {
  const history = useHistory();
  const router = (path)=> {
    history.push(path);
  }

  return <div className='header'>
      <div className='container'>
          <div className='links'>
              <span onClick={()=> router('/blogs-nav')}>热门博客</span>
              <span>收录博客</span>
              <span href='https://gohugo.io/'>搭建博客工具</span>
              <span href='/#'>功能建议</span>
          </div>
      </div>
  </div>
}