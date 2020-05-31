import React from 'react';
import Img from 'react-image';
import earth from 'images/earth.png';
import './index.less'

export default ({favicon, title, url, description})=> {
    const goto = ()=> {
        window.location.href = url;
    }
    
    return (
    <li className='card' onClick={goto}>
        {
            <Img className='avatar' alt='avatar' src={[favicon, `${url}/favicon.ico`]} unloader={<img className='avatar' alt='avatar' src={earth} />}/>
        }
        <div className='profile'>
            <p className='title'>{title}</p>
            <a className='url' href={url} target='_blank'>{url}</a>
            <p className='description'>{description}</p>
        </div>
    </li>
    )
}