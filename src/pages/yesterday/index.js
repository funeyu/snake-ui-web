import React, { useEffect, useState } from 'react';
import {fetch} from 'whatwg-fetch';
import Img from 'react-image';
import earth from 'images/earth.png';
import Header from 'components/header';
import Footer from 'components/footer';
import './index.less';

export default ()=> {
    const [list, setList] = useState([]);

    const searchApi = function() {
        fetch(`/api/snake/blog/latest`)
        .then((response)=> response.json())
        .then(function(res) {
            setList(res.data);
        }).catch(function(ex) {
        }).finally(()=> {
        });
    };

    useEffect(()=> {
        searchApi(1);
    }, []);
    
    return(
        <div className='y'>
            <Header active='yesterday' showLogo/>
            <Footer />
            <main>
                <div className='tags'>
                    <span className='tag'>技术</span>
                    <span className='tag selected'>编程语言</span>
                    <span className='tag'>生活感悟</span>
                    <span className='tag'>好文阅读</span>
                    <span className='tag'>其他</span>
                </div>
                <ol>
                    {
                        list && list.length > 0 && list.map(l=> {
                            return (
                                <li key={l.id}>
                                    <a href={l.url} target='_blank'>
                                    <Img alt='avatar'id='profile-avatar' src={[l.favicon]} 
                                        unloader={<img alt='avatar' src={earth} id='profile-avatar'/>} 
                                    />
                                        <div className='info'>
                                            <div className='title'>{l.title}</div>
                                            <div>{l.url}</div>
                                        </div>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ol>
            </main>
        </div>
    );
}