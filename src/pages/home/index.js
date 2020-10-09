import React from 'react';
import query from 'utils/query';
import { useLocation } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import zh from 'javascript-time-ago/locale/zh';
import Search from 'components/search';
import Footer from 'components/footer';
import logo from 'images/soso.png';
import './index.less';

TimeAgo.addLocale(zh);

export default ()=> {
  const queryObj = query(useLocation());
  return(
      <div className='home'>
        <div className='logo'>
          <img src={logo} />
        </div>
        <Search {...queryObj}/>
        <div className='topic'>
          <span className='one'>信条</span>
          <span className='one'>八佰</span>
          <span className='one'>唐人街探案3</span>
          <span className='one'>釜山行3</span>
          <span className='one'>花木兰</span>
        </div>
        <Footer />
      </div>
  );
}
