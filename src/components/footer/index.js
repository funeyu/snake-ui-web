import React from 'react';
import './index.less';

export default ()=> {
    return (
        <div className='footer'>
            <div className='container'>
                <span className='mid'>共收录<b>十万</b>级个人博客，索引<b>千万</b>级别博客页面</span>
                <span className='ir'>京ICP备20018270号</span>
                <span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
            </div>
        </div>
    )
}