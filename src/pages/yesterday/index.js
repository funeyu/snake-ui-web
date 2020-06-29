import React, { useEffect, useState } from 'react';
import {fetch} from 'whatwg-fetch';
import Img from 'react-image';
import { traceEvent } from 'utils/ga';
import Pagination from '@material-ui/lab/Pagination';
import earth from 'images/earth.png';
import Header from 'components/header';
import './index.less';

const TypeMap = {
    'all': -1, 'other': 0, 'tech': 1, 'language': 2, 'tool': 3, 'think': 4, 'goodreading': 5, 'pics': 6, 
};

const MapType = {
    '-1': 'all', '0': 'other', '1': 'tech', '2': 'language', '3': 'tool', '4': 'think', '5': 'goodreading', '6': 'pics'
};

export default ()=> {
    const [list, setList] = useState({});
    const [info, updateInfo] = useState({});
    const [type, updateType] = useState(TypeMap.all);
    const [value, setValue] = useState('');
    const [page, setPage] = useState(1);

    const searchApi = function(query, isTitle) {
        let f
        if (isTitle) {
            f = fetch(`/api/snake/blog/search/latest`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(query)
            });
        } else {
            f = fetch(`/api/snake/blog/latest`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(query)
            });
        }
        f.then((response)=> response.json())
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

    const changePage = function(event, pageNum) {
        setPage(pageNum);
        let query = {type, pageNum};
        if(value) {
            query.title = value;
        }
        searchApi(query, !!value);
    };

    const changeType = function(type) {
        traceEvent('yesterday', 'tab', MapType[type]);
        updateType(type);
        setPage(1);
        searchApi({type, pageNum: 1});
    };

    useEffect(()=> {
        searchApi({type: TypeMap.all, pageNum: 1});
        searchTotal();
    }, []);
    
    const onChange = function(event) {
        setValue(event.target.value);
    };

    const onSubmit = function() {
        setPage(1);
        searchApi({title:value, pageNum: 1}, true);
    };

    return(
        <div className='y'>
            <Header active='yesterday' showLogo/>
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
                <div style={{fontSize: '14px', color: '#aaa'}}>分类还有问题，我这人工智能不智能有点智障，等我驯服它，再修改此处分类，敬请期待！！</div>
                {
                    type === TypeMap.all && <div className='search'>
                        <span className='area'>
                        <input className='input' placeholder='' value={value} onChange={onChange} />
                        <input style={{top: 0}} className='button' type='submit' value='搜一下' onClick={onSubmit} />
                        </span>
                    </div>
                }
                <ol>
                    {
                        list && list.total > 0 && list.items.map(l=> {
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
                {
                list.total > 0 && <Pagination count={Math.ceil(list.total/20)} page={page} shape='rounded' size='small' boundaryCount={3}
                    onChange={changePage}
                    />
                }
            </main>
        </div>
    );
}
