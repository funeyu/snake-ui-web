import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {fetch} from 'whatwg-fetch';
import Img from 'react-image';
import TimeAgo from 'javascript-time-ago';
import zh from 'javascript-time-ago/locale/zh';
import Pagination from '@material-ui/lab/Pagination';
import Header from 'components/header';
import Banner from 'images/soso.png';
import Search from 'components/search';
import Footer from 'components/footer';
import earth from 'images/earth.png';
import './index.less';

TimeAgo.addLocale(zh);
const timeAgo = new TimeAgo('zh');

const query = function(location) {
  const splits = location.search.split('?');
  let query;
  if (splits.length > 1) {
    query = splits[1].split('&').reduce((pre, next)=> {
      let ss = next.split('=');
      if (ss.length === 2) {
        pre[ss[0]] = ss[1];
      }
      return pre;
    }, {});
  }
  return query;
}

export default ()=> {
    const queryObj = query(useLocation());
    console.log('queryObj', queryObj);
    const history = useHistory();
    const [list, updateList] = useState({data: [], total: 0});
    const [activePage, setActivePage] = useState(1);
    const [sort, setSort] = useState(1); // 1代表默认排序，2代表按照时间倒序
    const [showSort, setShowSort] = useState(false);

    const goHome = ()=> {
        history.push('/');
    }
    useEffect(()=> {
      searchApi(queryObj.keyword, sort);
    }, [queryObj.keyword, sort]);

    const searchApi = function(keyword, sort) {    
      fetch(`/snake?keyword=${keyword}&timesort=${sort}`)
        .then((response)=> response.json())
        .then(function(res) {
          updateList({
            data: res.data,
            keywords: res.keywords,
            total: res.total
          });
        }).catch(function(ex) {
          console.log('parsing failed', ex);
        });
    }

    const changePage = (event, page)=> {
      fetch(`/snake?keyword=${queryObj.keyword}&page=${page}&timesort=${sort}`)
        .then((response)=> response.json())
        .then(function(res) {
          updateList({
            data: res.data,
            keywords: res.keywords,
            total: res.total
          });
          setActivePage(page);
        }).catch(function(ex) {
          console.log('parsing failed', ex);
        });
    };
    
    const onSort = (x)=> {
      console.log('onSort', x);
      setSort(x);
      searchApi(queryObj.keyword, x)
    }
    
    const star = function(word, doc, type) {
      fetch(`/snake/star?id=${doc.id}&word=${word}&type=${type}`).then(data=> {
          updateList(lists=> lists.map(l=> {
            if (l.id === doc.id) {
              l.star = type === '1' ? l.star + 1 : l.star - 1;
            }
            return l
          }))
      })
    };

    const renderTitle = function(title, keywords) {
      let s = title.toLowerCase();
      keywords.forEach(k=> {
        let splits = s.split(k);
        s = splits.join('<span style="color:#2BCF61;">'+k+'</span>');
      });
      return <div dangerouslySetInnerHTML={{__html:s}}></div>
    }

    return <div className='search-page'>
        <Header />
        <div className='search-header'>
            <img className='logo' src={Banner} alt='logo' onClick={goHome}/>
            <Search {...queryObj}/>
        </div>
        <div className='result-list'>
          {
            list.data && list.data.length > 0 && <div className='abstract'>
              共搜索到<b>{list.total}</b>条数据
              <span className='sort iconfont icon-sorting' onClick={()=> setShowSort(x=> !x)}>
                <b>{sort === 1 ? '默认排序' : '时间倒序' }</b>
                <span className='selection' style={{display: showSort ? 'block' : 'none'}}>
                  <b className='tri'></b>
                  <b className='order' onClick={()=> onSort(1)}>默认排序</b>
                  <b className='order' onClick={()=> onSort(2)}>时间倒序</b>
                </span>
              </span>
            </div>
          }
          <ul className='result'>
            {
              list.data && list.data.map((l,index)=> <li key={index} className={l.isTop5 ? 'top5' : ''}>
                  <div className='title'>
                    {
                      l.favicon ? <Img className='avatar' alt='avatar' src={[l.favicon]} unloader={<img className='avatar' alt='avatar' src={earth} />}/>
                        : <img className='avatar' alt='avatar' src={earth} />
                    }
                    
                    {renderTitle(l.title, list.keywords)}
                  </div>
                  <div className='timeAgo'>{timeAgo.format(l.time_stamp * 1000)}</div>
                  <a className='link' href={l.url} target='_blank'>{l.url}</a>
                  <span>
                    <span className='plus' onClick={()=> star(queryObj.keyword, l, '1')}>+</span>
                    <button className='star-button'>
                      <svg class="octicon" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
                      <span>{l.star}</span>
                    </button>
                    <span class='minus' onClick={()=> star(queryObj.keyword, l, '2')}>-</span>
                  </span>
                </li>
              )
            }
          </ul>
          {
            list.total > 0 && <Pagination count={Math.ceil(list.total/10)} page={activePage} shape='rounded' size='small' boundaryCount={3}
                onChange={changePage}
              />
          }
        </div>
        <Footer />
    </div>
}