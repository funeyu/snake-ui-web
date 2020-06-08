import React, { useEffect, useState } from 'react';
import {fetch} from 'whatwg-fetch';
import Img from 'react-image';
import { traceEvent } from 'utils/ga';
import earth from 'images/earth.png';
import Header from 'components/header';
import Footer from 'components/footer';
import './index.less';

const TypeMap = {
    'all': -1, 'other': 0, 'tech': 1, 'language': 2, 'tool': 3, 'think': 4, 'goodreading': 5, 'pics': 6, 
};

const MapType = {
    '-1': 'all', '0': 'other', '1': 'tech', '2': 'language', '3': 'tool', '4': 'think', '5': 'goodreading', '6': 'pics'
};

export default ()=> {
    const [list, setList] = useState([]);
    const [info, updateInfo] = useState({});
    const [type, updateType] = useState(TypeMap.all);

    const searchApi = function(type) {
        fetch(`/api/snake/blog/latest?type=${type}`)
        .then((response)=> response.json())
        .then(function(res) {
            setList(res.data);
        }).catch(function(ex) {
        }).finally(()=> {
        });
    };

    const searchTotal = function() {
        fetch(`/api/snake/blog/latest/info`)
            .then((response)=> response.json())
            .then(res=> {
                updateInfo(res.data);
            });
    };

    const changeType = function(type) {
        traceEvent('yesterday', 'tab', MapType[type]);
        updateType(type);
        searchApi(type);
    };

    useEffect(()=> {
        searchApi(TypeMap.all);
        searchTotal();
    }, []);
    
    return(
        <div className='y'>
            <Header active='yesterday' showLogo/>
            <Footer />
            <main>
                <div className='tags'>
                    <span onClick={()=> changeType(TypeMap.all)} className={`${type===TypeMap.all ? 'tag selected': 'tag'}`}>全部<span className='num'>{info.total}</span></span>
                    <span onClick={()=> changeType(TypeMap.tech)} className={`${type===TypeMap.tech ? 'tag selected': 'tag'}`}>技术<span className='num'>{info.tech}</span></span>
                    <span onClick={()=> changeType(TypeMap.language)} className={`${type===TypeMap.language ? 'tag selected': 'tag'}`}>编程语言<span className='num'>{info.language}</span></span>
                    <span onClick={()=> changeType(TypeMap.tool)} className={`${type===TypeMap.tool ? 'tag selected': 'tag'}`}>工具<span className='num'>{info.tool}</span></span>
                    <span onClick={()=> changeType(TypeMap.think)} className={`${type===TypeMap.think ? 'tag selected': 'tag'}`}>生活感悟<span className='num'>{info.think}</span></span>
                    <span onClick={()=> changeType(TypeMap.goodreading)} className={`${type===TypeMap.goodreading ? 'tag selected': 'tag'}`}>好文阅读<span className='num'>{info.goodreading}</span></span>
                    <span onClick={()=> changeType(TypeMap.pics)} className={`${type===TypeMap.pics ? 'tag selected': 'tag'}`}>图集<span className='num'>{info.pics}</span></span>
                    <span onClick={()=> changeType(TypeMap.other)} className={`${type===TypeMap.other ? 'tag selected': 'tag'}`}>其他<span className='num'>{info.other}</span></span>
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