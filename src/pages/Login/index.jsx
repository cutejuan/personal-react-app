import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {userUpdate} from '../../store/userinfoReducer.js'
import Header from '../../components/Header'
import LoginComponent from '../../components/Login'

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
                <Header title="登录"/>
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
        if (userinfo.username) {
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
        let userinfo = this.props.userinfo
        userinfo.username = username
        actions.update(userinfo)

        const params = this.props.params
        const router = params.router
        if (router) {
            // 跳转到指定的页面
            this.props.history.push(router)
        } else {
            // 跳转到用户主页
            this.goUserPage()
        }
    }
    goUserPage() {
        this.props.history.push('/User')
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userUpdate, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)