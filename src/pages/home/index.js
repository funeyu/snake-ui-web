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
        <iframe src='http://funeyu.github.io/'>
          
        </iframe>
        <Footer />
      </div>
  );
}
