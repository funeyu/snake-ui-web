import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from 'components/header';
import Banner from 'images/soso.png';
import Footer from 'components/footer';
import './index.less';

export default ()=> {
    const history = useHistory();

    const goHome = ()=> {
        history.push('/');
    };
    return(
        <div className='book'>
            <Header active='book'/>
            <div className='book-header'>
                <img className='logo' src={Banner} alt='logo' onClick={goHome}/>
            </div>
            <Footer />
            <main>
                <ul>
                    <li>
                        <img alt='book_image_url' src='https://img13.360buyimg.com/n1/jfs/t8611/165/1974659002/217226/6c67d259/59c22dd4N646421f4.jpg' />
                        <div className='right'>
                            <p className='title'>《写给大家看的设计书（第4版）》</p>
                            <p>推荐理由：有30位博主写过该书的读书笔记，点击<b>查看详情</b></p>
                            <p><a href='https://search.jd.com/Search?keyword=%E5%86%99%E7%BB%99%E5%A4%A7%E5%AE%B6%E7%9C%8B%E7%9A%84%E8%AE%BE%E8%AE%A1%E4%B9%A6&enc=utf-8&suggest=8.his.0.0&wq=&pvid=8c72ba142056463e882c75a4f146bc63' className='buy'>购买</a></p>
                        </div>
                    </li>
                    <li>
                        <img alt='book_image_url' src='https://img14.360buyimg.com/n1/jfs/t3235/43/1426302686/269479/249c9d4c/57ccf79aNedd6e655.jpg' />
                        <div className='right'>
                            <p className='title'>《影响力（经典版）：人生必读100本书之一 [Influence: The Psychology of Persuasion]》</p>
                            <p>推荐理由：有30位博主写过该书的读书笔记，点击<b>查看详情</b></p>
                            <p><a href='https://search.jd.com/Search?keyword=%E5%86%99%E7%BB%99%E5%A4%A7%E5%AE%B6%E7%9C%8B%E7%9A%84%E8%AE%BE%E8%AE%A1%E4%B9%A6&enc=utf-8&suggest=8.his.0.0&wq=&pvid=8c72ba142056463e882c75a4f146bc63' className='buy'>购买</a></p>
                        </div>
                    </li>
                    <li>
                        <img alt='book_image_url' src='https://img10.360buyimg.com/n1/jfs/t1519/131/198721377/200812/584886dd/55643512Ne480d0e2.jpg' />
                        <div className='right'>
                            <p className='title'>《配色设计原理》</p>
                            <p>推荐理由：有30位博主写过该书的读书笔记，点击<b>查看详情</b></p>
                            <p><a href='https://search.jd.com/Search?keyword=%E5%86%99%E7%BB%99%E5%A4%A7%E5%AE%B6%E7%9C%8B%E7%9A%84%E8%AE%BE%E8%AE%A1%E4%B9%A6&enc=utf-8&suggest=8.his.0.0&wq=&pvid=8c72ba142056463e882c75a4f146bc63' className='buy'>购买</a></p>
                        </div>
                    </li>
                    <li>
                        <img alt='book_image_url' src='https://img13.360buyimg.com/n1/jfs/t8611/165/1974659002/217226/6c67d259/59c22dd4N646421f4.jpg' />
                        <div className='right'>
                            <p className='title'>《写给大家看的设计书（第4版）》</p>
                            <p>推荐理由：有30位博主写过该书的读书笔记，点击<b>查看详情</b></p>
                            <p><a href='https://search.jd.com/Search?keyword=%E5%86%99%E7%BB%99%E5%A4%A7%E5%AE%B6%E7%9C%8B%E7%9A%84%E8%AE%BE%E8%AE%A1%E4%B9%A6&enc=utf-8&suggest=8.his.0.0&wq=&pvid=8c72ba142056463e882c75a4f146bc63' className='buy'>购买</a></p>
                        </div>
                    </li>
                    <li>
                        <img alt='book_image_url' src='https://img13.360buyimg.com/n1/jfs/t8611/165/1974659002/217226/6c67d259/59c22dd4N646421f4.jpg' />
                        <div className='right'>
                            <p className='title'>《写给大家看的设计书（第4版）》</p>
                            <p>推荐理由：有30位博主写过该书的读书笔记，点击<b>查看详情</b></p>
                            <p><a href='https://search.jd.com/Search?keyword=%E5%86%99%E7%BB%99%E5%A4%A7%E5%AE%B6%E7%9C%8B%E7%9A%84%E8%AE%BE%E8%AE%A1%E4%B9%A6&enc=utf-8&suggest=8.his.0.0&wq=&pvid=8c72ba142056463e882c75a4f146bc63' className='buy'>购买</a></p>
                        </div>
                    </li>
                    <li>
                        <img alt='book_image_url' src='https://img13.360buyimg.com/n1/jfs/t8611/165/1974659002/217226/6c67d259/59c22dd4N646421f4.jpg' />
                        <div className='right'>
                            <p className='title'>《写给大家看的设计书（第4版）》</p>
                            <p>推荐理由：有30位博主写过该书的读书笔记，点击<b>查看详情</b></p>
                            <p><a href='https://search.jd.com/Search?keyword=%E5%86%99%E7%BB%99%E5%A4%A7%E5%AE%B6%E7%9C%8B%E7%9A%84%E8%AE%BE%E8%AE%A1%E4%B9%A6&enc=utf-8&suggest=8.his.0.0&wq=&pvid=8c72ba142056463e882c75a4f146bc63' className='buy'>购买</a></p>
                        </div>
                    </li>
                    <li>
                        <img alt='book_image_url' src='https://img13.360buyimg.com/n1/jfs/t8611/165/1974659002/217226/6c67d259/59c22dd4N646421f4.jpg' />
                        <div className='right'>
                            <p className='title'>《写给大家看的设计书（第4版）》</p>
                            <p>推荐理由：有30位博主写过该书的读书笔记，点击<b>查看详情</b></p>
                            <p><a href='https://search.jd.com/Search?keyword=%E5%86%99%E7%BB%99%E5%A4%A7%E5%AE%B6%E7%9C%8B%E7%9A%84%E8%AE%BE%E8%AE%A1%E4%B9%A6&enc=utf-8&suggest=8.his.0.0&wq=&pvid=8c72ba142056463e882c75a4f146bc63' className='buy'>购买</a></p>
                        </div>
                    </li>
                    <li>
                        <img alt='book_image_url' src='https://img13.360buyimg.com/n1/jfs/t8611/165/1974659002/217226/6c67d259/59c22dd4N646421f4.jpg' />
                        <div className='right'>
                            <p className='title'>《写给大家看的设计书（第4版）》</p>
                            <p>推荐理由：有30位博主写过该书的读书笔记，点击<b>查看详情</b></p>
                            <p><a href='https://search.jd.com/Search?keyword=%E5%86%99%E7%BB%99%E5%A4%A7%E5%AE%B6%E7%9C%8B%E7%9A%84%E8%AE%BE%E8%AE%A1%E4%B9%A6&enc=utf-8&suggest=8.his.0.0&wq=&pvid=8c72ba142056463e882c75a4f146bc63' className='buy'>购买</a></p>
                        </div>
                    </li>

                </ul>
            </main>
        </div>
    );
}