import React, {useState, useEffect} from 'react';
import Header from 'components/header';
import api from 'hooks/apiHook';
import TimeAgo from 'javascript-time-ago';
import zh from 'javascript-time-ago/locale/zh';
import Preview from 'components/preview';
import { postJson } from 'utils/api';
import './index.less';

TimeAgo.addLocale(zh);
const timeAgo = new TimeAgo('zh');

export default ()=> {
  const [type, updateType] = useState(2);
  const [domainIndex, updateDi] = useState(0);
  const [tops, updateTops] = useState([]);
  const [detail, updateDetail] = useState('');
  const hots = api.Get('/api/snake/hot/tags');
  
  useEffect(()=> {
    if(hots) {
      let feed = hots[type][domainIndex];
      postJson('/api/snake/hot/list', {url: feed.url}).then(res=> {
        updateTops(res.data);
      });
    }
  }, [type, domainIndex, hots]);

  const updateDomain = function(i) {
    updateDi(i);
    updateDetail('');
  };

  const changeType = function(type) {
    updateDi(0);
    updateDetail('');
    updateType(type);
  };

  console.log('detail', detail);
  return(
      <div className='home'>
          <Header />
          <main>
            <div className='aside-list'>
              <div className='tags'>
                <span className='iconfont icon-hot hot'>热榜：</span>
                <span className={`${type === 2  ? 'tag active' : 'tag' }`} onClick={()=> changeType(2)}>黑客</span>
                <span className={`${type === 3  ? 'tag active' : 'tag' }`} onClick={()=> changeType(3)}>社区</span>
                <span className={`${type === 4  ? 'tag active' : 'tag' }`} onClick={()=> changeType(4)}>视频</span>
                <span className={`${type === 5  ? 'tag active' : 'tag' }`} onClick={()=> changeType(5)}>新闻</span>
                <span className={`${type === 6  ? 'tag active' : 'tag' }`} onClick={()=> changeType(6)}>体育</span>
              </div>
              <div className='aside-wrap'>
                <aside className='column-scrollable'>
                  <ul>
                    {
                      hots && hots[type].map((h, i)=> {
                        return <li key={i} className={i === domainIndex ? 'selected' : ''} onClick={()=> updateDomain(i)}>
                          <img src={h.favicon} alt='favicon' /> <span className='title'>{h.title}</span>
                        </li>
                      })
                    }
                  </ul>
                  <div className='bottom'>——到底了——</div>
                </aside>
                <div className='articles column-scrollable'>
                  {
                      tops && tops.map((t, i)=> {
                          return <article key={i} className={t.url === detail ? 'active' : ''} onClick={()=>updateDetail(t.url)}>
                              <div className='num'>{i + 1}</div>
                              <div className='con'>
                                  <h3>{t.title}</h3>
                                  {
                                    !!t.timestamp && <div className='time'>创建于: {timeAgo.format(t.timestamp * 1000)}</div>
                                  }
                              </div>
                          </article>
                      })
                  }
                </div>
              </div>
            </div>
            <Preview detail={detail}/>
          </main>
      </div>
  );
}
