import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {fetch} from 'whatwg-fetch';
import query from 'utils/query';
import { traceEvent } from 'utils/ga';
import ListItem from 'components/list-item';
import Pagination from '@material-ui/lab/Pagination';
import Header from 'components/header';
import Preview from 'components/preview';
import Nothing from 'components/nothing';
import './index.less';

export default ()=> {
    const queryObj = query(useLocation());
    const [list, updateList] = useState({data: [], total: 0});
    const [activePage, setActivePage] = useState(1);
    const [activeId, updateActive] = useState();
    const [loading, updateLoading] = useState(false);
    const [detail, updateDetail] = useState({});
    const [isInPhone, updatePhone] = useState(false);
    const listenerRef = useRef();

    useEffect(()=> {
      var sUserAgent = navigator.userAgent;
      if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1){
        updatePhone(true);
      }
    }, []);
    useEffect(()=> {
      traceEvent('search', 'click', queryObj.keyword);
      searchApi(queryObj.keyword, queryObj.type);
      return ()=> {
        document.addEventListener('click', listenerRef.current, false);
      };
    }, [queryObj.timestamp, queryObj.keyword]);

    const searchApi = function(keyword, type) {    
      updateLoading(true);
      fetch(`/api/snake/search/?word=${keyword}&type=${type}`)
        .then((response)=> response.json())
        .then(function(res) {
          updateList({
            data: res.data.items,
            keywords: res.data.keywords,
            total: res.data.total
          });
          setActivePage(1);
        }).catch(function(ex) {
          console.log('parsing failed', ex);
        }).finally(()=> {
          updateLoading(false);
        });
    };

    const changePage = (event, page)=> {
      traceEvent('search', 'changepage', `${page}`);
      updateLoading(true);
      fetch(`/api/snake/search/?word=${queryObj.keyword}&type=${queryObj.type}&page=${page}`)
        .then((response)=> response.json())
        .then(function(res) {
          updateList({
            data: res.data.items,
            keywords: res.data.keywords,
            total: res.data.total
          });
          setActivePage(page);
        }).catch(function(ex) {
          console.log('parsing failed', ex);
        }).finally(()=> {
          updateLoading(false);
        });
    };

    const changeItem = function(i) {
      updateDetail(i);
      updateActive(i.id);
      if(isInPhone || i.isIframe === 0) {
        window.open(i.url, "__blank");
      }
    };

    return (
      <div className='search-page'>
        <Header />
        <main>
          <div className='aside-list'>
            <div className='result-list'>
              {
                !loading && !list.data || list.data.length === 0 && <Nothing word={queryObj.keyword} type={queryObj.type} />
              }
              {
                list.data && list.data.length > 0 && <div className='abstract'>
                  小蛇探到<b>{list.total}</b>条数据
                  {
                      list.total > 0 && <Pagination count={Math.ceil(list.total/15)} page={activePage} shape='rounded' size='small' boundaryCount={2}
                        onChange={changePage}
                      />
                  }
                </div>
              }
              <ul className='result'>
                {
                  list.data && list.data.map((l,index)=> <ListItem mode='search' l={l} keywords={list.keywords} onClick={()=> changeItem(l)} activeId={activeId} />)
                }
              </ul>
            </div>
          </div>
          {
            !isInPhone && <Preview detail={detail}/>
          }
        </main>
      </div>
    )
}
