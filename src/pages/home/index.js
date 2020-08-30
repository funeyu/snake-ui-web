import React from 'react';
import query from 'utils/query';
import { useLocation } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import zh from 'javascript-time-ago/locale/zh';
import Search from 'components/search';
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
        <div className='note'>
          <p>全网搜索免费电影,电视剧,动漫(百万视频资源),有趣的个人博客(千万个人博客)</p>
          <p>www.xiaoshesoso.com 搜罗有趣的小东西</p>
          <p>仅限个人交流学习，搜索的内容来源第三方网站</p>
        </div>
        <Search {...queryObj}/>
      </div>
  );
}
