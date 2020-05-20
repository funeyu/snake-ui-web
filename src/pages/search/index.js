import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {fetch} from 'whatwg-fetch';
import query from 'utils/query';
import ga from 'utils/ga';
import ListItem from 'components/list-item';
import Pagination from '@material-ui/lab/Pagination';
import Header from 'components/header';
import Banner from 'images/soso.png';
import Search from 'components/search';
import Nothing from 'components/nothing';
import Footer from 'components/footer';
import './index.less';

export default ()=> {
    const queryObj = query(useLocation());
    const history = useHistory();
    const [list, updateList] = useState({data: [], total: 0});
    const [activePage, setActivePage] = useState(1);
    const [sort, setSort] = useState(1); // 1代表默认排序，2代表按照时间倒序
    const [showSort, updateShowSort] = useState(false);
    const [loading, updateLoading] = useState(false);
    const listenerRef = useRef();

    const goHome = ()=> {
        history.push('/');
    }

    if (!listenerRef.current) {
      listenerRef.current = function(event) {
        const id = event.target.getAttribute('id');
        if (id !== 'sort') { // 去除冒泡来自sort的元素
          updateShowSort(x=>{
            if(x) {
              return !x;
            }
            return x;
          });
        }
      }
    }

    const setShowSort = ()=> {
      updateShowSort(x=>{
        if (!x) { //要打开sort，这时要监听document上的点击事件，关闭showSort
          document.addEventListener('click', listenerRef.current, false);
        } else {
          document.removeEventListener('click', listenerRef.current, false);
        }
        return !x;
      });
    }

    useEffect(()=> {
      ga.event({
        category: 'search', 
        action: 'click',
        label: queryObj.keyword,
      });
      searchApi(queryObj.keyword, sort);
      return ()=> {
        document.addEventListener('click', listenerRef.current, false);
      }
    }, [queryObj.timestamp, queryObj.keyword, sort]);

    const searchApi = function(keyword, sort) {    
      updateLoading(true);
      fetch(`/api/snake/search/?word=${keyword}&sort=${sort}`)
        .then((response)=> response.json())
        .then(function(res) {
          updateList({
            data: res.data,
            keywords: res.keywords,
            total: res.total
          });
          setActivePage(1);
        }).catch(function(ex) {
          console.log('parsing failed', ex);
        }).finally(()=> {
          updateLoading(false);
        });
    }

    const changePage = (event, page)=> {
      ga.event({
        category: 'search',
        action: 'changepage',
        label: `${page}`
      });
      updateLoading(true);
      fetch(`/api/snake/search/?word=${queryObj.keyword}&page=${page}&sort=${sort}`)
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
        }).finally(()=> {
          updateLoading(false);
        });
    };

    const onSort = (x)=> {
      setSort(x);
      searchApi(queryObj.keyword, x)
    }
    
    const operation = function(word, doc, type) {
      fetch('/api/snake/search/op/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          docId: doc.id,
          word,type 
        })
      }).then(res=>res.json()).then(data=> {
        if(data.success) {
          if (type != 3) {
            updateList(list=> {
              return {
                data: list.data.map(l=> {
                  if (l.id === doc.id) {
                    l.star = type === 1 ? l.star + 1 : l.star - 1;
                  }
                  return l;
                }),
                keywords: list.keywords,
                total: list.total
              };
            });
          }
          alert('操作成功！');
        } else {
          alert('操作失败:' + data.msg);
        }
      });
    };

    return (
      <div className='search-page'>
        <Header />
        <div className='search-header'>
            <img className='logo' src={Banner} alt='logo' onClick={goHome}/>
            <Search {...queryObj}/>
        </div>
        <div className='result-list'>
          {
            !loading && !list.data || list.data.length === 0 && <Nothing word={queryObj.keyword} />
          }
          {
            list.data && list.data.length > 0 && <div className='abstract'>
              共搜索到<b>{list.total}</b>条数据
              <span className='sort iconfont icon-sorting' onClick={setShowSort}>
                <b id='sort'>{sort === 1 ? '默认排序' : '时间倒序' }</b>
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
              list.data && list.data.map((l,index)=> <ListItem mode='search' l={l} keywords={list.keywords} operation={operation} />)
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
    )
}