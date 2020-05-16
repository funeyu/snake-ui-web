import React from 'react';
import './index.less'

export default ({favicon, title, url, description})=> {
    const goto = ()=> {
        window.location.href = url;
    }
    
    return (
    <li className='card' onClick={goto}>
        <img className='avatar' alt='favicon' src={favicon} />
        <div className='profile'>
            <p className='title'>{title}</p>
            <a className='url' href={url} target='_blank'>{url}</a>
            <p className='description'>{description}</p>
        </div>
    </li>
    )
}