import React from 'react';
import Yesterday from '../yesterday';
import './index.less';

export default ()=> {
    return (
        <div className='hot-area'>
            <ul className='tags'>
                <li className='active'>博客<div className='border'></div></li>
                <li>黑客<div className='border'></div></li>
                <li>热榜<div className='border'></div></li>
                <li>视频<div className='border'></div></li>
                <li>社区<div className='border'></div></li>
            </ul>
            <div className='content'>
                <Yesterday />
            </div>
        </div>
    )
}