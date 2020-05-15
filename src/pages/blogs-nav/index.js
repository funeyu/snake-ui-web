import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import BloggerCard from 'components/blogger-card';
import soso from '../../images/soso.png'
import './index.less';

export default ()=> {
  const history = useHistory();
  const [blogs, updateBlogs] = useState([]);
  const [where, updateWhere] = useState({lang: 1, type: 1});

  console.log('where', where);

  const goHome = ()=> {
    history.push('/');
  }
  const api = function(lang, type) {    
    fetch(`/api/snake/blog/nav?lang=${lang}&type=${type}`)
      .then((response)=> response.json())
      .then(function(items) {
        updateBlogs(items);
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }
  
  // where 包含 {lang, type} 
  // lang: 1为国内，2为国外； type: 1为热门博客主，2为多产博客主；
  const changeWhere = function(w) {
    updateWhere(where=> {
      console.log(where, w);
      if (where.lang !== w.lang) {
        return {
          lang: w.lang,
          type: 1
        }
      }
      if (where.lang === w.lang && where.type !== w.type) {
        return {
          lang: where.lang,
          type: w.type
        }
      }
      return where;
    })
  }

  useEffect(()=> {
    api(where.lang, where.type);
  }, [where]);


  return <div className='nav'>
    <aside className='aside'>
      <img className='logo' src= {soso} alt='soso' onClick={goHome}/>
      <h3 className='tip'>热门博客列表</h3>
      <div className={`${where.lang === 1 ? 'nav selected' : 'nav'}`} onClick={()=> changeWhere({lang: 1, type: 1})}>国内博客</div>
      <div className={`${where.lang === 2 ? 'nav selected' : 'nav'}`} onClick={()=>changeWhere({lang: 2, type: 1})}>国外博客</div>
    </aside>
    <main className='main'>
      <div className='selection'>
        <span className={`${where.type === 1 ? 'selected' : ''}`} onClick={()=> changeWhere({lang: where.lang, type: 1})}><span className='iconfont icon-hot'></span>热门博客主</span>
        <span className={`${where.type === 2 ? 'selected' : ''}`} onClick={()=> changeWhere({lang: where.lang, type: 2})}><span className='iconfont icon-all'></span>多产博客主</span>
      </div>
      {
        blogs.map(blog=> <BloggerCard key={blog.id} {...blog} />)
      }
    </main>
  </div>
}