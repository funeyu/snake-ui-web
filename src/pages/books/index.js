import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';
import Pagination from '@material-ui/lab/Pagination';
import {fetch} from 'whatwg-fetch';
import Header from 'components/header';
import Banner from 'images/soso.png';
import Footer from 'components/footer';
import './index.less';

export default ()=> {
    const history = useHistory();
    const [list, setList] = useState({});
    const [activePage, setActivePage] = useState(1);

    const goHome = ()=> {
        history.push('/');
    };
    const onDetail = ()=> {
        Modal.info({
            content: <span className='docs'>
            <b>荐书： 中央帝国的财政密码</b>
            <b>心流</b>
            <b>荐书： 苏世明，我的经验与教训</b>
            <b>荐书： 中央帝国的财政密码</b>
            <b>荐书： 中央帝国的财政密码</b>
            <b>荐书： 中央帝国的财政密码</b>
            </span>
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
            <Header active='books'/>
            <div className='book-header'>
                <img className='logo' src={Banner} alt='logo' onClick={goHome}/>
            </div>
            <Footer />
            <main>
                <ul>
                    {
                        list.data && list.data.length > 0 && list.data.map(l=> {
                            return <li key={l.id}>
                            <img alt='book_image_url' src={l.picUrl} />
                            <div className='right'>
                                <p className='title'>《{l.name}》</p>
                                <p>推荐理由：有{l.notesNum}位博主写过该书的读书笔记，点击<span className='detail' onClick={onDetail}>查看详情</span></p>
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