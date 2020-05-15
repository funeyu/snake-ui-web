import React from 'react';
import { useLocation } from 'react-router-dom';
import Img from 'react-image';
import earth from 'images/earth.png';
import TimeAgo from 'javascript-time-ago';
import zh from 'javascript-time-ago/locale/zh';
import query from 'utils/query';
import './index.less';

TimeAgo.addLocale(zh);
const timeAgo = new TimeAgo('zh');

// mode: 分为搜索列表模式(search) 和 收藏点赞个人列表(profile)
export default ({l, keywords, mode, operation})=> {
  console.log('query', query);
  const queryObj = query(useLocation());

  const renderTitle = function(title, keywords) {
    if (mode === 'profile') {
      return title;
    }
    
    let s = title.toLowerCase();
    keywords.forEach(k=> {
      let splits = s.split(k);
      s = splits.join('<em>'+k+'</em>');
    });
    return (<div dangerouslySetInnerHTML={{__html:s}} />);
  }

  return (
    <li className='' key={l.id} className={l.isTop5 && mode === 'search' ? 'top5 list-item' : 'list-item'}>
      <div className='title'>
        {
          l.favicon ? <Img className='avatar' alt='avatar' src={[l.favicon]} unloader={<img className='avatar' alt='avatar' src={earth} />}/>
            : <img className='avatar' alt='avatar' src={earth} />
        }
        <a className='link title' href={l.url} target='_blank'>
          {renderTitle(l.title, keywords)}
        </a>
      </div>
      <div className='timeAgo'>创建于:{timeAgo.format(l.timeStamp * 1000)}</div>
      <div className='description'>{l.description}</div>
      <a className='link no-decoration' href={l.url} target='_blank'>{l.url}</a>
      {
        mode === 'search' && (
          <span>
            <span className='collect' onClick={()=> operation(queryObj.keyword, l, 3)}>收藏</span>
            <span>
              <span className='plus' onClick={()=> operation(queryObj.keyword, l, 1)}>+</span>
              <button className='star-button'>
                <svg className="octicon" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
                <span>{l.star}</span>
              </button>
              <span className='minus' onClick={()=> operation(queryObj.keyword, l, 2)}>-</span>
            </span>
          </span>
        )
      }
      
    </li>
  )
}