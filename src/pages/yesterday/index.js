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
                <div className='title'>昨日新增博文：<b>{list.length}</b></div>
                <ol>
                    {
                        list && list.length > 0 && list.map(l=> {
                            return (
                                <li key={l.id}>
                                    <a href={l.url} target='_blank'>
                                    <Img alt='avatar'id='profile-avatar' src={[l.favicon || "https://juejin.im/favicon.ico"]} 
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