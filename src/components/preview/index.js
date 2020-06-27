import React, { useState, useEffect, useRef } from 'react';
import logo from 'images/soso.png';
import './index.less';

export default ({detail})=> {
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

  return <div className={`${collapsed? 'preview collapsed' : 'preview'}`}>
    <div className='flip-wrap'>
      <div className='flip'>
        <span onClick={onCollapse} className={`${collapsed ? 'iconfont icon-double-arro-right' : 'iconfont icon-double-arrow-left'}`}></span>
        <span className='active'>预览</span>
        <span onClick={()=> window.open(detail)}>查看原网站</span>
      </div>
    </div>
    {
      detail && <iframe frameborder='0'  name='d' id='de' title='de' ref={ref} src={detail} onLoad={onLoad} />
    }
    {
      !detail && <div className='notes'>
        <img src={logo} />
        <p>点击左侧某一个，在此预览</p>
      </div>
    }
    {loading &&
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    }
  </div>
}
