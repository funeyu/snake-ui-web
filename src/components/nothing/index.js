import React from 'react';
import './index.less';

const Types = {
    'blog': '博客', 'movie': '电影', 'tv': '电视', 'animation': '动漫', 'music': '音乐', 'tool': '工具', 'hot': '热榜'
};

export default ({word, type})=> {
    const w = window.decodeURIComponent(word)
    return (
        <div className='nothing'>
            <p>很抱歉，没有找到与“<span className='highlight'>{word}</span>”相关的{Types[type]}</p>
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
