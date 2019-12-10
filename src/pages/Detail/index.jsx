import React from 'react'
import BScroll from 'better-scroll'
import Header from '../../components/Header'
import Info from './subpage/Info'
import Buy from './subpage/buy'
import Comment from './subpage/Comment'

import {createHashHistory} from 'history'

import './style.scss'

class Detail extends React.PureComponent {
    render() {
        let pathname = this.props.history.location.pathname;

        // 获取商户ID
        const id = pathname.substr(8)
        
        return (
            <div id="detail">
                <Header title="商户详情" type="share" history={createHashHistory()}/>

                <div className="detail-scroll" ref={(el)=>{this.wrapper = el}} >
                    <div style={{width:'100%'}}>
                        <Info id={id}/>
                        <Buy history={createHashHistory()} id={id}/>
                        <Comment id={id}/>
                    </div>
                </div>
                
            </div>
        )
    }

    componentDidMount(){
        let wrapper = this.wrapper;
        let scroll = new BScroll(wrapper, {
            tap: true,
            click: true,
            scrollY: true,
            scrollX: false,
        })

        scroll.on('beforeScrollStart', ()=>{
            scroll.refresh();
        })
    }
}
 
export default Detail