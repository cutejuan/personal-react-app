import React from 'react'
import { connect } from 'react-redux'
import {requestNewSearch} from '../../store/searchListReducer'
import SearchHeader from '../../components/SearchHeader'
import SearchList from './subpage/List'

import BScroll from 'better-scroll'
import './style.scss'

class Search extends React.PureComponent {
    constructor(){
        super();
        this.state={
            isShowLoad: false
        }
    }
    render() {
        const params = this.props.params || {};
        let pathname = this.props.history.location.pathname;
        return (
            <div id="search">
                <SearchHeader history={this.props.history} keyword="" />

                <div className="search-scroll" ref={(el)=>{this.wrapper = el}} >
                    <div style={{width:'100%'}}>
                        <SearchList keyword={params.keyword || ''} category={params.category || ''} searchlist={this.props.searchlist} showLoad={this.state.isShowLoad}/>
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
                this.props.getNewSearch();
            } 
        })
        
    }

    fetchData(){
        if(this.props.searchlist.length>0){
            return
        } else {
            this.props.getNewSearch();
        }
    }

}

const mapStateToProps = (state)=> ({
    userinfo: state.userInfo,
    searchlist: state.searchlist.searchList
})

const mapDispatchToProps = (dispatch)=> {
    return {
        getNewSearch(){
            console.log('执行getNewSearch');
            let action = requestNewSearch();
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)