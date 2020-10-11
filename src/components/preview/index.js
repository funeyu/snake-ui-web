import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {fetch} from 'whatwg-fetch';
import query from 'utils/query';
import Loading from 'components/loading';
import logo from 'images/soso.png';
import './index.less';

export default ({detail})=> {
  const queryObj = query(useLocation());
  const [collapsed, updateCollapsed] = useState(false);
  const [loading, updateLoading] = useState(false);
  const ref = useRef();

  const onCollapse = function() {
    updateCollapsed(x=>!x);
  };

  useEffect(()=> {
    if(detail) {
      updateLoading(true);
      setTimeout(()=> {
        updateLoading(false);
      }, 8000);
    }
  }, [detail]);

  const onLoad = function() {
    updateLoading(false);
  };

  const onRotateOrDump = function(t) {
    const query = {
      type: queryObj.type,
      t,
      info: detail
    }
    fetch(`/api/snake/search/star`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(query)
    }).then(res=> res.json())
      .then(data=> {
        if (data.code === 10000) {
          alert(`${t===1?'盘' : '甩'}成功！`)
        } else {
          alert(data.msg || '操作失败！');
        }
      });
  }

  return <div className={`${collapsed? 'preview collapsed' : 'preview'}`}>
    {
      detail.url &&
      <div className='flip-wrap'>
        <div className='flip'>
          <span onClick={onCollapse} className={`${collapsed ? 'iconfont icon-double-arro-right' : 'iconfont icon-double-arrow-left'}`}></span>
          <span className='active'>预览</span>
          <span onClick={()=> window.open(detail)}>查看原网站</span>
          <span onClick={()=> onRotateOrDump(1)}>喜欢就 <b style={{color: '#2BCF61', fontSize: 16}}>盘</b>起来</span>
          <span onClick={()=> onRotateOrDump(2)}>不爱就 <b style={{color: '#333', fontSize: 16}}>甩</b>了吧</span>
        </div>
      </div>
    }
    
    {
      detail.url && <iframe frameborder='0'  name='d' id='de' title='de' ref={ref} src={detail.url} onLoad={onLoad} />
    }
    {
      !detail.url && <div className='notes'>
        <img src={logo} />
        <p>点击左侧一下，在此预览</p>
      </div>
    }
    {loading && <Loading />}
  </div>
}
