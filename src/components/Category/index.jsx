import React from 'react'
import ReactSwipe from 'react-swipe'
import { Link } from 'react-router-dom'

import './style.scss'

class Category extends React.PureComponent {
    render(){

        // 轮播图配置项
        const opt = {
            startSlide: 0,
            auto: 2500,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            callback: function (num) {
                // 更新当前轮播图的index
               this.setClassName(num)
            }.bind(this)
        }
        return (
            <div id="home-category">
                <ReactSwipe className="carousel" swipeOptions={opt}>
                    <div className="carousel-item">
                        <ul className="clear-fix">
                            <Link to="/search/jingdian"><li className="float-left jingdian">景点</li></Link>
                            <Link to="/search/ktv"><li className="float-left ktv">KTV</li></Link>
                            <Link to="/search/gouwu"><li className="float-left gouwu">购物</li></Link>
                            <Link to="/search/shenghuofuwu"><li className="float-left shenghuofuwu">生活服务</li></Link>
                            <Link to="/search/jianshenyundong"><li className="float-left jianshenyundong">健身运动</li></Link>
                            <Link to="/search/meifa"><li className="float-left meifa">美发</li></Link>
                            <Link to="/search/qinzi"><li className="float-left qinzi">亲子</li></Link>
                            <Link to="/search/xiaochikuaican"><li className="float-left xiaochikuaican">小吃快餐</li></Link>
                            <Link to="/search/zizhucan"><li className="float-left zizhucan">自助餐</li></Link>
                            <Link to="/search/jiuba"><li className="float-left jiuba">酒吧</li></Link>
                        </ul>
                    </div>
                    <div className="carousel-item">
                        <ul className="clear-fix">
                            <Link to="/search/meishi"><li className="float-left meishi">美食</li></Link>
                            <Link to="/search/dianying"><li className="float-left dianying">电影</li></Link>
                            <Link to="/search/jiudian"><li className="float-left jiudian">酒店</li></Link>
                            <Link to="/search/xuixianyule"><li className="float-left xuixianyule">休闲娱乐</li></Link>
                            <Link to="/search/waimai"><li className="float-left waimai">外卖</li></Link>
                            <Link to="/search/huoguo"><li className="float-left huoguo">火锅</li></Link>
                            <Link to="/search/liren"><li className="float-left liren">丽人</li></Link>
                            <Link to="/search/dujiachuxing"><li className="float-left dujiachuxing">度假出行</li></Link>
                            <Link to="/search/zuliaoanmo"><li className="float-left zuliaoanmo">足疗按摩</li></Link>
                            <Link to="/search/zhoubianyou"><li className="float-left zhoubianyou">周边游</li></Link>
                        </ul>
                    </div>
                    <div className="carousel-item">
                        <ul className="clear-fix">
                            <Link to="/search/ribencai"><li className="float-left ribencai">日本菜</li></Link>
                            <Link to="/search/spa"><li className="float-left SPA">SPA</li></Link>
                            <Link to="/search/jiehun"><li className="float-left jiehun">结婚</li></Link>
                            <Link to="/search/xuexipeixun"><li className="float-left xuexipeixun">学习培训</li></Link>
                            <Link to="/search/xican"><li className="float-left xican">西餐</li></Link>
                            <Link to="/search/huochejipiao"><li className="float-left huochejipiao">火车机票</li></Link>
                            <Link to="/search/shaokao"><li className="float-left shaokao">烧烤</li></Link>
                            <Link to="/search/jiazhuang"><li className="float-left jiazhuang">家装</li></Link>
                            <Link to="/search/chongwu"><li className="float-left chongwu">宠物</li></Link>
                            <Link to="/search/all"><li className="float-left quanbufenlei">全部分类</li></Link>
                        </ul>
                    </div>
                </ReactSwipe>
                <div className="index-container">
                    <ul ref={(el)=>{this.lis=el}}>
                        <li className="selected"></li>
                        <li ></li>
                        <li ></li>
                    </ul>
                </div>
            </div>
        )
        
    }
  
    setClassName(num){
        let Lis = this.lis.querySelectorAll('li');
        Lis.forEach((item, index) => {
            if(index===num){
                item.className = "selected";
            } else {
                item.className = ""
            }
        });
    }
}

export default Category