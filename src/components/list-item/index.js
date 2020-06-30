import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Img from 'react-image';
import earth from 'images/earth.png';
import TimeAgo from 'javascript-time-ago';
import UserContext from 'contexts/user.js';
import zh from 'javascript-time-ago/locale/zh';
import query from 'utils/query';
import './index.less';

const Favicons = {
  
  "https://www.lizi14.com": {
    source: "栗子影视", favicon: "https://www.lizi14.com/Tpl/dc06/Img/favicon.ico"
  },
  "https://www.fydy8.com": {
    source: "飞鱼电影", favicon: "https://www.fydy8.com/statics/img/favicon.ico"
  },
  "https://www.duopian.cc": {
    source: "多片电影网", favicon: "https://www.duopian.cc/template/duopian/asset/img/favicon.ico"
  },
  "https://www.feikong.cc": {
    source: "飞空精品影院", favicon: "https://www.feikong.cc/Tpl/feikong/Images/favicon.ico"
  },
  "https://www.gaochao.tv": {
    source: "高潮影院", favicon: "https://www.gaochao.tv/favicon.ico"
  },
  "https://www.2346.me": {
    source: "斗驴影视", favicon: "https://www.2346.me/template/mytheme/statics/image/20200430/70b31cc0b.ico"
  },
  "https://www.xigua00.com": {
    source: "西瓜影院", favicon: "https://www.xigua00.com/favicon.ico"
  },
  "https://www.20sw.com": {
    source: "狮王影视", favicon: "https://www.20sw.com/statics/img/favicon.ico"
  },
  "https://www.6zee.com": {
    source: "6zee影院", favicon: "https://www.6zee.com/template/conch/asset/img/favicon.png"
  },
  "https://www.cef2.com": {
    source: "星空影院", favicon: ""
  },
  "https://www.guojuren.com": {
    source: "锅剧人", favicon: "https://www.guojuren.com/statics/img/favicon.ico"
  },
  "https://www.haha1000.com": {
    source: "开心影院", favicon: "https://www.haha1000.com/favicon.ico"
  },
  "https://www.laobage.com": {
    source: "老八哥", favicon: "https://www.laobage.com/favicon.ico"
  },
  "https://cdn.jsdelivr.net": {
    source: "29影院", favicon: "https://cdn.jsdelivr.net/gh/amujie/mojia@master/asset/img/favicon.png"
  },
  "https://www.huan86.com": {
    source: "欢欢影视", favicon: "https://www.huan86.com/favicon.ico"
  },
  "https://www.jinqiangyu.cc": {
    source: "金枪鱼影院", favicon: "https://www.jinqiangyu.cc/favicon.ico"
  },
  "https://007ys.cn": {
    source: "小小影视", favicon: "https://007ys.cn/template/vfed/asset/img/favicon.png"
  },
  "http://www.jinri688.com":{
    source: "万科影视", favicon: "http://www.jinri688.com/favicon.ico"
  },
  "http://www.imeee.net": {
    source: "唯美网", favicon: "http://www.imeee.net/template/nec/i/img/favicon.png"
  },
  "https://www.cmdy5.com": {
    source: "草民电影", favicon: "https://www.cmdy5.com/favicon.ico"
  },
  "https://www.965ys.net":{
    source: "965影视", favicon: "https://www.965ys.net/favicon.ico"
  },
  "https://www.chahanju.com": {
    source: "查韩剧影院", favicon: "https://www.chahanju.com/favicon.ico",
  },
  "https://www.fenghuos.com": {
    source: "烽火影视", favicon: "https://www.fenghuos.com/favicon.ico",
  },
  "https://www.zhuzhuys.com": {
    source: "猪猪影视", favicon: "https://www.zhuzhuys.com/favicon.ico"
  },
  
  "https://www.pili5.cn": {
    source: "efuns", "favicon": "https://www.pili5.cn/template/mytheme/statics/image/20200515/2dc428aa6.ico",
  },
  "http://www.nieta.co" :{
    "source": "捏他",
    "favicon": "http://www.nieta.co/favicon.ico",
  },
  "https://www.feiniaoyy.com": {
    "source": "飞鸟影视",
    "favicon": "https://www.feiniaoyy.com/upload/site/20190730-1/2531fb2aad87299db9fd6cce7a86799a.png",
  },
  "https://www.78zhuiju.com" :{
    "source": "西瓜追剧",
    "favicon": "https://www.78zhuiju.com/favicon.ico",
  },
  "https://mua99s.com": {
    "source": "mva99s",
    "favicon": "https://mua99s.com/template/custom/statics/image/20200511/c890ec82e.png",
  },
  "https://moetv.live": {
    "source": "moeTV",
    "favicon": "https://moetv.live/favicon.ico",
  },
  "https://dy.sjtz.xyz": {
    "source": "兔纸影视",
    "favicon": "https://dy.sjtz.xyz/favicon.ico",
  },
  "https://hktv5.com": {
    "source": "港剧网",
    "favicon": "https://hktv5.com/template/mytheme/statics/image/20191204/d85a7d9df.ico"
  },
  "https://jiukuaibo.tv": {
    "source": "就快播",
    "favicon": "https://jiukuaibo.tv/favicon.ico",
  },
  "https://bowang.tv":{
    "source": "播王",
    "favicon": "https://bowang.tv/template/conch/asset/img/favicon.png"
  },
  "https://jiage.la": {
    "source": "加个电影",
    "favicon": "https://jiage.la/Tpl/jiage/Img/favicon.ico",
  },
  "https://www.lekan8.cn": {
    "source": "乐看吧",
    "favicon": "https://www.lekan8.cn/template/conch/asset/img/favicon.png",
  },
  "https://www.88ys.com": {
    "source": "88影视网",
    "favicon": "https://www.88ys.com/favicon.ico"
  },
  "https://www.kktv0.com": {
    "source": "YYCMS",
    "favicon": "https://www.kktv0.com/favicon.ico"
  },
  "https://www.iktai.com": {
    "source": "爱看台",
    "favicon": "https://www.iktai.com/upload/site/20200619-1/1b2cf53cf9b4a5cc78d973d47700bed4.png",
  },
  "https://www.boluolm.com": {
    "source": "菠萝电影",
    "favicon": "https://www.boluolm.com/template/vfed/asset/img/favicon.png",
  },
  "https://5ji.tv": {
    "source": "无极影院",
    "favicon": "https://api.taohaokan.com/statics/img/favicon.png",
  },
  "https://www.heiying.cc": {
    "source": "黑鹰电影",
    "favicon": "https://www.heiying.cc/favicon.ico",
  },
  "https://www.9ekk.com": {
    "source": "9亿看看",
    "favicon": "https://www.9ekk.com/template/mytheme/statics/image/20200524/5a457d73e.ico",
  },
  "https://www.91video.cc": {
    "source": "91电影",
    "favicon": "https://www.91video.cc/upload/site/20200604-1/a32837f64559d270686f5627b08ae3c3.png",
  },
  "https://www.maxtv.vip": {
    "source": "麦克斯影视",
    "favicon": "https://www.maxtv.vip/template/mytheme/statics/image/20200317/bc94e94c2.ico",
  },
  "https://www.jisshu.com": {
    "source": "极少数影视",
    "favicon": "https://www.jisshu.com/template/vfed/asset/img/favicon.png",
  }
};
TimeAgo.addLocale(zh);
const timeAgo = new TimeAgo('zh');

// mode: 分为搜索列表模式(search) 和 收藏点赞个人列表(profile)
export default ({l, keywords, mode, onClick, operation, activeId})=> {
  const queryObj = query(useLocation());

  const renderTitle = function(title, keywords) {
    if (mode === 'profile' || !keywords) {
      return title;
    }
    
    let s = title.toLowerCase();
    keywords.forEach(k=> {
      let splits = s.split(k);
      s = splits.join('<em>'+k+'</em>');
    });
    return (<div dangerouslySetInnerHTML={{__html:s}}></div>);
  }

  const info = useContext(UserContext);

  const operationWrap = function(keyword, record, type) {
    operation(keyword, record, type);
  }

  const renderOp = function(record) {
    return (
      <span>
        {
          record.isCollected ? <span className='gray'>已收藏</span> :
            <span className='collect' onClick={()=> operationWrap(queryObj.keyword, l, 3)}>收藏</span>
        }
        <span>
          <span className='plus' onClick={()=> operationWrap(queryObj.keyword, l, 1)}>+</span>
          <button className='star-button'>
            <svg className="octicon" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
            <span>{l.star}</span>
          </button>
          <span className='minus' onClick={()=> operationWrap(queryObj.keyword, l, 2)}>-</span>
        </span>
      </span>
    )
  }
  
  const clickItem = function(item) {
    console.log('clickItema');
    onClick && onClick(item);
  }

  const renderIcon = function(item) {
    const { type } = queryObj;
    if(type === 'movie' || type === 'tv' || type === 'animation') { // 如果是 电影、电视、动漫
      const h = item.url.split('://')[0];
      const o = item.url.split('://')[1].split('/')[0];
      let cc = [h, '://', o].join('');
      console.log('cc', cc);
      const favicon = (Favicons[cc] || {}).favicon;
      return <Img className='avatar' alt='avatar' src={[favicon]} unloader={<img className='avatar' alt='avatar' src={earth} />} />
    }
    if (item.favicon) {
      return <Img className='avatar' alt='avatar' src={[item.favicon]} unloader={<img className='avatar' alt='avatar' src={earth} />}/>
    }
    return <img className='avatar' alt='avatar' src={earth} />
  }

  return (
    <li className='' key={l.id} className={l.id ===activeId && mode === 'search' ? 'top5 list-item' : 'list-item'} onClick={()=> clickItem(l)}>
      <div className='title'>
        {renderIcon(l)}
        <div className='link title' href={l.url} target='_blank'>
          {renderTitle(l.title, keywords)}
        </div>
      </div>
      <div className='timeAgo'>创建于:{l.timeStamp ? timeAgo.format(l.timeStamp * 1000) : '暂无'}</div>
      <div className='description'>{l.description}</div>
      <a className='link no-decoration' href={l.url} target='_blank'>{l.url}</a>
    </li>
  )
}
