import React, {useEffect, useState, useContext, useCallback} from 'react';
import { useHistory } from 'react-router-dom';
import { traceEvent } from 'utils/ga';
import Header from 'components/header';
import UserContext from 'contexts/user';
import BloggerCard from 'components/blogger-card';
import soso from '../../images/soso.png';
import './index.less';

export default ()=> {
  const history = useHistory();
  const [blogs, updateBlogs] = useState([]);
  const [where, updateWhere] = useState({lang: 1, type: 1});

  const goHome = ()=> {
    history.push('/');
  };
  
  const api = function(lang, type) {    
    fetch(`/api/snake/blog/nav?lang=${lang}&type=${type}`)
      .then((response)=> response.json())
      .then(function(items) {
        updateBlogs(items);
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  };
  
  // where 包含 {lang, type} 
  // lang: 1为国内，2为国外； type: 1为热门博客主，2为多产博客主；
  const changeWhere = function(w) {
    traceEvent('blogs', 'change', {1: '国内', 2: '国外'}[w.lang]);
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
    });
  };

  useEffect(()=> {
    api(where.lang, where.type);
  }, [where]);

  const follow = useCallback((domain)=> {
    traceEvent('blogs', 'follow', domain);
    fetch(`/api/snake/search/op/`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({type: 3, info: {domain}})
    }).then(function(items) {
        api(where.lang, where.type);
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }, []);

  const userInfo = useContext(UserContext);
  return (
    <div className='nav'>
      <Header active='blogs'/>
      <aside className='side'>
        <img className='logo' src= {soso} alt='soso' onClick={goHome}/>
        <h3 className='tip'>热门博客列表</h3>
        <div className={`${where.lang === 1 ? 'side-bar selected' : 'side-bar'}`} onClick={()=> changeWhere({lang: 1, type: 1})}>国内博客</div>
        <div className={`${where.lang === 2 ? 'side-bar selected' : 'side-bar'}`} onClick={()=>changeWhere({lang: 2, type: 1})}>国外博客</div>
      </aside>
      <main className='m'>
        <div className='selection'>
          <span className={`${where.type === 1 ? 'selected' : ''}`} onClick={()=> changeWhere({lang: where.lang, type: 1})}><span className='iconfont icon-hot'></span>热门博客主</span>
          <span className={`${where.type === 2 ? 'selected' : ''}`} onClick={()=> changeWhere({lang: where.lang, type: 2})}><span className='iconfont icon-all'></span>多产博客主</span>
        </div>
        {
          blogs.map(blog=> <BloggerCard key={blog.id} userInfo={userInfo} {...{follow}} {...blog} />)
        }
      </main>
    </div>
  );
}
