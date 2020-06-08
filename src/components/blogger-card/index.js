import React from 'react';
import Img from 'react-image';
import { Modal } from 'antd';
import earth from 'images/earth.png';
import './index.less'

export default ({favicon, title, url, domain, description, isCollected, userInfo, follow})=> {
    const alertNologin = ()=> {
        Modal.confirm({
            title: '抱歉没有登录，不能使用“收藏功能”！',
            okText: '去登录',cancelText: '不了',
            onOk: ()=> window.location.href = '/api/snake/github/'
        });
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