import React from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import LoginComponent from '../../components/Login'
import {createHashHistory} from "history"
import localStore from '../../utils/localStore'

class Login extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checking: true
        }
    }
    render() {
        return (
            <div>
                <Header title="登录" history={createHashHistory()} />
                {
                    // 等待验证之后，再显示登录信息
                    this.state.checking
                    ? <div>{/* 等待中 */}</div>
                    : <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
                }
            </div>
        )
    }
    componentDidMount() {
        // 判断是否已经登录
        this.doCheck()
    }
    doCheck() {
        const userinfo = this.props.userinfo
        console.log('isLogin', userinfo.username);
        const username = localStore.getItem('username');

        if (userinfo.username || username) {
            // 已经登录，则跳转到用户主页
            this.goUserPage();
        } else {
            // 未登录，则验证结束
            this.setState({
                checking: false
            })
        }
    }
    // 处理登录之后的事情
    loginHandle(username) {
        // 保存用户名
        const actions = this.props.userInfoActions
        let userinfo = this.props.userinfo;
        
        userinfo.username = username;
        
        this.props.userUpdate(userinfo)
        localStore.setItem('username', username)
        this.goUserPage()
    }
    goUserPage() {
        this.props.history.push('/User')
    }
}

// react-redux

function mapStateToProps(state) {
    return {
        userinfo: state.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userUpdate(data){
            dispatch({
                type: 'userinfoUpdate',
                value: data
            })
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)