import React from 'react';
import Header from 'components/header';
import Banner from 'images/soso.png';
import Search from 'components/search';
import Footer from 'components/footer';
import './index.less';

export default ()=> {
    return <div className='home'>
        <Header />
        <div className='banner'><img src={Banner} alt='logo' /></div>
        <Search />
        <div className='note'>一个纯粹的<b>个人博客</b>搜索引擎</div>
        <Footer />
    </div>
}