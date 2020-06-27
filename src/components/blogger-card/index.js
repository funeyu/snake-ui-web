import React from 'react';
import Img from 'react-image';
import earth from 'images/earth.png';
import './index.less'

export default ({favicon, title, url, domain, description, isCollected, userInfo, follow})=> {
    const alertNologin = ()=> {
    };

    const renderBtn = function(isCollected, userInfo, domain) {
        if (!userInfo || !userInfo.logined) {
            return <span className='follow' onClick={alertNologin}>收藏</span>
        } else if(isCollected) {
            return <span className='follow followed'>已收藏</span>
        } else {
            return <span className='follow' onClick={()=>follow(domain)}>收藏</span>
        }
    }
    
    return (
    <li className='card'>
        {
            <Img className='avatar' alt='avatar' src={[favicon, `${url}/favicon.ico`]} unloader={<img className='avatar' alt='avatar' src={earth} />}/>
        }
        {
            renderBtn(isCollected, userInfo, domain)
        }
        <div className='abstract'>
            <p className='title'>{title}</p>
            <a className='url' href={url} target='_blank'>{url}</a>
            <p className='description'>{description}</p>
        </div>
    </li>
    )
}
