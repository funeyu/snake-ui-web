import React from 'react';
import './index.less';

export default ({word})=> {
    const w = window.decodeURIComponent(word)
    return (
        <div className='nothing'>
            <p>很抱歉，没有找到与“<span className='highlight'>{w}</span>”相关的博客</p>
            <div className='note'>
                温馨提示：
                <ul>
                    <li>请检查您的输入是否正确</li>
                    <li>如网页未收录或者新站未收录，请提交网址给我们</li>
                    <li>如有任何意见或建议，请及时反馈给我们</li>
                </ul>
            </div>
        </div>
    )
}