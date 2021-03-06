import React, {useEffect, useState} from 'react';
import query from 'utils/query';
import { useLocation } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import {fetch} from 'whatwg-fetch';
import zh from 'javascript-time-ago/locale/zh';
import Search from 'components/search';
import Footer from 'components/footer';
import logo from 'images/soso.png';
import './index.less';

TimeAgo.addLocale(zh);

export default ()=> {
  const queryObj = query(useLocation());
  const [hot, updateHot] = useState([]);

  useEffect(()=>{
    changeHot('movie')
  }, []);

  const changeHot = function(type) {
    fetch(`/api/snake/search/hot?type=${type}`).then(res=> res.json())
      .then(res=> {
        updateHot(res.data);
      });
  }

  return(
      <div className='home'>
        <div className='logo'>
          <img src={logo} />
        </div>
        <Search {...queryObj} changeHot={changeHot}/>
        <div className='topic'>
          用户点赞热榜：
          {
            hot.map(h=> {
              return <span className='one'><a target='_blanck' href={h.url}>{h.title}</a></span>
            })
          }
        </div>
        <Footer />
      </div>
  );
}
