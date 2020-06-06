import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';
import Pagination from '@material-ui/lab/Pagination';
import {fetch} from 'whatwg-fetch';
import Header from 'components/header';
import Footer from 'components/footer';
import './index.less';

export default ()=> {
    const history = useHistory();
    const [list, setList] = useState({});
    const [activePage, setActivePage] = useState(1);

    const goHome = ()=> {
        history.push('/');
    };
    const onDetail = (record)=> {
        const list = [
            {url: 'xxxx', title: '测试一把吧！'},
            {url: 'xxxx', title: '测试一把吧！'},
            {url: 'xxxx', title: '测试一把吧！'},
            {url: 'xxxx', title: '测试一把吧！'}
        ]
        Modal.info({
            title: `《${record.name}》读书笔记详情`,
            content: <div className='docs'>
                {
                    list.map((l, index)=> <div key={index}><a href={l.url}>{l.title}</a></div>)
                }
            </div>
        })
    }

    const searchApi = function(pageNum) {
        fetch(`/api/snake/book/list`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({pageNum})
        })
        .then((response)=> response.json())
        .then(function(res) {
            const data = res.data;
            setList({
                data: data.items,
                total: data.total
            });
            setActivePage(pageNum);
        }).catch(function(ex) {
        }).finally(()=> {
        });
    }

    const changePage = (event, page)=> {
        searchApi(page);
    };

    useEffect(()=> {
        searchApi(1);
    }, []);
    
    return(
        <div className='book'>
            <Header active='books' showLogo/>
            <Footer />
            <main>
                <ul>
                    {
                        list.data && list.data.length > 0 && list.data.map(l=> {
                            return <li key={l.id}>
                            <img alt='book_image_url' src={l.picUrl} />
                            <div className='right'>
                                <p className='title'>《{l.name}》</p>
                                <p>推荐理由：有{l.notesNum}位博主写过该书的读书笔记，点击<span className='detail' onClick={()=> onDetail(l)}>查看详情</span></p>
                                <p><a href={l.buyUrl} className='buy' target='_blank'>购买</a></p>
                            </div>
                        </li>
                        })
                    }
                </ul>

                {
                list.total > 0 && <Pagination count={Math.ceil(list.total/10)} page={activePage} shape='rounded' size='small' boundaryCount={3}
                    onChange={changePage}
                    />
                }
            </main>
        </div>
    );
}