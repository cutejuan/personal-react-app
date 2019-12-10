import React from 'react'
import { connect } from 'react-redux'

import BuyAndStore from '../../../components/BuyAndStore'

class Buy extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isStore: false
        }
    }
    render() {
        return (
            <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
        )
    }
    componentDidMount() {
        // 验证当前商户是否收藏
        this.checkStoreState()
    }
    // 检验当前商户是否被收藏
    checkStoreState() {
        const id = this.props.id
        const store = this.props.store

        store.forEach(item => {
            if (item.id === id) {
                // 已经被收藏
                this.setState({
                    isStore: true
                })
                return false
            }
        })
    }
    // 检查登录状态
    loginCheck() {
        const id = this.props.id
        const userinfo = this.props.userinfo
        if (!userinfo.username) {
            // 跳转到登录页面的时候，要传入目标router，以便登录完了可以自己跳转回来
            this.props.history.push('/Login/' + encodeURIComponent('/detail/' + id))
            return false
        }
        return true
    }
    // 购买事件
    buyHandle() {
        // 验证登录，未登录则retur
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

        // 跳转到用户主页
        this.props.history.push('/User')
    }
    // 收藏
    storeHandle() {
        // 验证登录，未登录则return
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

        const id = this.props.id

        if (this.state.isStore) {
            // 已经被收藏了，则取消收藏
            this.props.rm({id: id})
        } else {
            // 未收藏，则添加到收藏中
            this.props.add({id: id})
        }
        // 修改状态
        this.setState({
            isStore: !this.state.isStore
        })
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userInfo,
        store: state.storeReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        update(data){
            dispatch({
                type: 'storeUpdate',
                value: data
            })
        },
        add(item){
            dispatch({
                type: 'storeAdd',
                value: item
            })
        },
        rm(item){
            dispatch({
                type: 'storeRM',
                value: item
            })
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)