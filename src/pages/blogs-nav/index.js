import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from 'components/footer';
import BloggerCard from 'components/blogger-card';
import soso from '../../images/soso.png'
import './index.less';

const blogs = [
  {id: 1, url: 'https://zzming.cn', title: '邹老大爷的博客	', favicon: 'https://biezhi.me/images/favicon.png', description: 'android,java,诗,散文,随笔	'},
  {id: 2, url: 'https://zzugbb.github.io', title: '张小康|个人博客', favicon: 'https://zzugbb.github.io/images/favicon.ico', description: 'hexo, 个人博客'},
  {id: 3, url: 'https://zzzhoudj.github.io', title: '中国科学院大学-周登继	', favicon: 'https://hutusi.com/assets/favicon-32x32.png', description: ''},
  {id: 4, url: 'https://www.xwintop.com', title: '追风的博客 - 追风的博客	', favicon: 'https://larryli.cn/wp-content/uploads/2018/08/192.png', description: '小游戏开发,微信小游戏,科技,技术,编程,框架,模版,引擎,博客,追风的博客	'},
  {id: 5, url: 'https://www.licoy.cn', title: '憧憬,licoy,博客,憧憬博客,wordpress,java,php,html	',favicon: 'https://my.hancel.org/media/favicon.ico', description: '憧憬,licoy,博客,憧憬博客,wordpress,java,php,html'},
  {id: 11, url: 'https://zzming.cn', title: '邹老大爷的博客	', favicon: 'https://biezhi.me/images/favicon.png', description: 'android,java,诗,散文,随笔	'},
  {id: 12, url: 'https://zzugbb.github.io', title: '张小康|个人博客', favicon: 'https://zzugbb.github.io/images/favicon.ico', description: 'hexo, 个人博客'},
  {id: 13, url: 'https://zzzhoudj.github.io', title: '中国科学院大学-周登继	', favicon: 'https://hutusi.com/assets/favicon-32x32.png', description: ''},
  {id: 14, url: 'https://www.xwintop.com', title: '追风的博客 - 追风的博客	', favicon: 'https://larryli.cn/wp-content/uploads/2018/08/192.png', description: '小游戏开发,微信小游戏,科技,技术,编程,框架,模版,引擎,博客,追风的博客	'},
  {id: 15, url: 'https://www.licoy.cn', title: '憧憬,licoy,博客,憧憬博客,wordpress,java,php,html	',favicon: 'https://my.hancel.org/media/favicon.ico', description: '憧憬,licoy,博客,憧憬博客,wordpress,java,php,html'},
  {id: 21, url: 'https://zzming.cn', title: '邹老大爷的博客	', favicon: 'https://biezhi.me/images/favicon.png', description: 'android,java,诗,散文,随笔	'},
  {id: 22, url: 'https://zzugbb.github.io', title: '张小康|个人博客', favicon: 'https://zzugbb.github.io/images/favicon.ico', description: 'hexo, 个人博客'},
  {id: 23, url: 'https://zzzhoudj.github.io', title: '中国科学院大学-周登继	', favicon: 'https://hutusi.com/assets/favicon-32x32.png', description: ''},
  {id: 24, url: 'https://www.xwintop.com', title: '追风的博客 - 追风的博客	', favicon: 'https://larryli.cn/wp-content/uploads/2018/08/192.png', description: '小游戏开发,微信小游戏,科技,技术,编程,框架,模版,引擎,博客,追风的博客	'},
  {id: 25, url: 'https://www.licoy.cn', title: '憧憬,licoy,博客,憧憬博客,wordpress,java,php,html	',favicon: 'https://my.hancel.org/media/favicon.ico', description: '憧憬,licoy,博客,憧憬博客,wordpress,java,php,html'},
  {id: 111, url: 'https://zzming.cn', title: '邹老大爷的博客	', favicon: 'https://biezhi.me/images/favicon.png', description: 'android,java,诗,散文,随笔	'},
  {id: 112, url: 'https://zzugbb.github.io', title: '张小康|个人博客', favicon: 'https://zzugbb.github.io/images/favicon.ico', description: 'hexo, 个人博客'},
  {id: 113, url: 'https://zzzhoudj.github.io', title: '中国科学院大学-周登继	', favicon: 'https://hutusi.com/assets/favicon-32x32.png', description: ''},
  {id: 114, url: 'https://www.xwintop.com', title: '追风的博客 - 追风的博客	', favicon: 'https://larryli.cn/wp-content/uploads/2018/08/192.png', description: '小游戏开发,微信小游戏,科技,技术,编程,框架,模版,引擎,博客,追风的博客	'},
  {id: 115, url: 'https://www.licoy.cn', title: '憧憬,licoy,博客,憧憬博客,wordpress,java,php,html	',favicon: 'https://my.hancel.org/media/favicon.ico', description: '憧憬,licoy,博客,憧憬博客,wordpress,java,php,html'},
  {id: 1111, url: 'https://zzming.cn', title: '邹老大爷的博客	', favicon: 'https://biezhi.me/images/favicon.png', description: 'android,java,诗,散文,随笔	'},
  {id: 1112, url: 'https://zzugbb.github.io', title: '张小康|个人博客', favicon: 'https://zzugbb.github.io/images/favicon.ico', description: 'hexo, 个人博客'},
  {id: 1113, url: 'https://zzzhoudj.github.io', title: '中国科学院大学-周登继	', favicon: 'https://hutusi.com/assets/favicon-32x32.png', description: ''},
  {id: 1114, url: 'https://www.xwintop.com', title: '追风的博客 - 追风的博客	', favicon: 'https://larryli.cn/wp-content/uploads/2018/08/192.png', description: '小游戏开发,微信小游戏,科技,技术,编程,框架,模版,引擎,博客,追风的博客	'},
  {id: 1115, url: 'https://www.licoy.cn', title: '憧憬,licoy,博客,憧憬博客,wordpress,java,php,html	',favicon: 'https://my.hancel.org/media/favicon.ico', description: '憧憬,licoy,博客,憧憬博客,wordpress,java,php,html'},
  {id: 1121, url: 'https://zzming.cn', title: '邹老大爷的博客	', favicon: 'https://biezhi.me/images/favicon.png', description: 'android,java,诗,散文,随笔	'},
  {id: 1122, url: 'https://zzugbb.github.io', title: '张小康|个人博客', favicon: 'https://zzugbb.github.io/images/favicon.ico', description: 'hexo, 个人博客'},
  {id: 1123, url: 'https://zzzhoudj.github.io', title: '中国科学院大学-周登继	', favicon: 'https://hutusi.com/assets/favicon-32x32.png', description: ''},
  {id: 1124, url: 'https://www.xwintop.com', title: '追风的博客 - 追风的博客	', favicon: 'https://larryli.cn/wp-content/uploads/2018/08/192.png', description: '小游戏开发,微信小游戏,科技,技术,编程,框架,模版,引擎,博客,追风的博客	'},
  {id: 1125, url: 'https://www.licoy.cn', title: '憧憬,licoy,博客,憧憬博客,wordpress,java,php,html	',favicon: 'https://my.hancel.org/media/favicon.ico', description: '憧憬,licoy,博客,憧憬博客,wordpress,java,php,html'},
];
export default ()=> {
  const history = useHistory();

  const goHome = ()=> {
    history.push('/');
  }

  return <div className='nav'>
    <aside className='aside'>
      <img className='logo' src= {soso} alt='soso' onClick={goHome}/>
      <h3 className='tip'>热门博客列表</h3>
      <div className='nav selected'>国内博客</div>
      <div className='nav'>国外博客</div>
    </aside>
    <main className='main'>
      <div className='selection'>
        <span className='selected'><span className='iconfont icon-hot'></span>热门博客主</span>
        <span><span className='iconfont icon-all'></span>多产博客主</span>
      </div>
      {
        blogs.map(blog=> <BloggerCard key={blog.id} {...blog} />)
      }
    </main>
  </div>
}