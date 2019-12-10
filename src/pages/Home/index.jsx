import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import HomeHeader from '../../components/HomeHeader'
import Category from '../../components/Category'
import Ad from './subpage/Ad'
import List from './subpage/List'
import {createHashHistory} from 'history'

import BScroll from 'better-scroll'
import './home.scss'

import {requestNewList} from '../../store/homelistReducer'

class Home extends PureComponent {
    constructor(){
        super();
        this.state={
            isShowLoad: false
        }
    }
    render() {
        return (
            <div id="home" >
                <HomeHeader history={createHashHistory()} cityName={this.props.userinfo.cityName}/>

                <div className="home-scroll" ref={(el)=>{this.wrapper = el}} >
                    <div style={{width:'100%'}}>
                        <Category/>
                        <div style={{height: '15px'}}>{/* 分割线 */}</div>
                        <Ad/>
                        <List cityName={this.props.userinfo.cityName} list={this.props.likelist} showLoad={this.state.isShowLoad} />
                    </div>
                </div>


            </div>
        )
    }

    componentDidMount(){

        // 首次渲染请求数据
        this.fetchData();

        // 构建滚动视图
        let wrapper = this.wrapper;
        let scroll = new BScroll(wrapper, {
            tap: true,
            click: true,
            probeType: 1,
            scrollY: true,
            scrollX: false,
        })

        scroll.on('beforeScrollStart', ()=>{
            scroll.refresh();
        })

        scroll.on('scroll', (pos)=>{
            let y= pos.y;
            let maxY = scroll.maxScrollY;
            if (maxY-y>=0){
                this.setState({
                    isShowLoad: true
                })
            } else {
                this.setState({
                    isShowLoad: false
                })
            }
        })

        scroll.on('touchEnd', (pos)=>{
            let y= pos.y;
            let maxY = scroll.maxScrollY;
            if(maxY-y>45){
                this.props.getNewList();
            } 
        })
        
    }

    fetchData(){
        if(this.props.likelist.length>0 ){
            return
        } else {
            this.props.getNewList();
        }
    }

}

const mapStateToProps = (state)=> ({
    userinfo: state.userInfo,
    likelist: state.homelist.likelist,
})

const mapDispatchToProps = (dispatch)=> {
    return {
        getNewList(){
            console.log('执行getNewList');
            let action = requestNewList();
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)