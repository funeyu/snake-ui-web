import React from 'react';
import { useHistory } from 'react-router-dom';
import favicon from 'images/favicon.png';
import './index.less';

export default ({active})=> {
  const history = useHistory();
  
  return (
    <div className='header'>
      <div className='admin'><a href="/"><img alt='favicon' src={favicon} /></a>小蛇管理后台</div>
      <div className='container'>
        <div className='links'>
            <span className={active === 'blogs' ? 'hot active' : 'hot'} onClick={()=> history.push('/admin/blogs')}><b className='tri'></b>博客管理</span>
            <span className={active === 'checks' ? 'hot active' : 'hot'} onClick={()=> history.push('/admin/checks')}><b className='tri'></b>博客审核</span>
            <span className={active === 'books' ? 'hot active' : 'hot'} onClick={()=> history.push('/admin/books')}><b className='tri'></b>书籍管理</span>
        </div>
    </div>
  </div>
  )
}