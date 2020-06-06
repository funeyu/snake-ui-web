import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Img from 'react-image';
import { Modal } from 'antd';
import earth from 'images/earth.png';
import TimeAgo from 'javascript-time-ago';
import UserContext from 'contexts/user.js';
import zh from 'javascript-time-ago/locale/zh';
import query from 'utils/query';
import './index.less';

TimeAgo.addLocale(zh);
const timeAgo = new TimeAgo('zh');

// mode: 分为搜索列表模式(search) 和 收藏点赞个人列表(profile)
export default ({l, keywords, mode, operation})=> {
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
    return (<div dangerouslySetInnerHTML={{__html:s}}></div>);
  }

  const info = useContext(UserContext);

  const operationWrap = function(keyword, record, type) {
    if(!info || !info.logined) {
      Modal.confirm({
        title: `抱歉没有登录，不能使用${type === 3 ? '“收藏功能”' : '点赞或踩功能'}！`,
        okText: '去登录',cancelText: '不了',
        onOk: ()=> window.location.href = '/api/snake/github/'
      });
      return ;
    }
    
    operation(keyword, record, type);
  }

  const renderOp = function(record) {
    return (
      <span>
        {
          record.isCollected ? <span className='collect' onClick={()=> operationWrap(queryObj.keyword, l, 3)}>收藏</span> :
          <span className='gray'>已收藏</span>
        }
        <span>
          <span className='plus' onClick={()=> operationWrap(queryObj.keyword, l, 1)}>+</span>
          <button className='star-button'>
            <svg className="octicon" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
            <span>{l.star}</span>
          </button>
          <span className='minus' onClick={()=> operationWrap(queryObj.keyword, l, 2)}>-</span>
        </span>
      </span>
    )
  }

  return (
    <li className='' key={l.id} className={l.isTop5 && mode === 'search' ? 'top5 list-item' : 'list-item'}>
      <div className='title'>
        {
          l.favicon ? <Img className='avatar' alt='avatar' src={[l.favicon]} unloader={<img className='avatar' alt='avatar' src={earth} />}/>
            : <img className='avatar' alt='avatar' src={earth} />
        }
        <div className='lang'>{{1: '中文', 2: '外文', 0: '中文'}[l.lang]}</div>
        <a className='link title' href={l.url} target='_blank'>
          {renderTitle(l.title, keywords)}
        </a>
      </div>
      <div className='timeAgo'>创建于:{l.timeStamp ? timeAgo.format(l.timeStamp * 1000) : '暂无'}</div>
      <div className='description'>{l.description}</div>
      <a className='link no-decoration' href={l.url} target='_blank'>{l.url}</a>
      {
        mode === 'search' && renderOp(l)
      }
      
    </li>
  )
}