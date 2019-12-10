import React from 'react'
import { connect } from 'react-redux'

import Header from '../../components/Header'
import UserInfo from '../../components/UserInfo'
import OrderList from './subpage/OrderList'

import localStore from '../../utils/localStore'
import {createHashHistory} from 'history'

class User extends React.PureComponent {
    render() {
        const userinfo = this.props.userinfo
        return (
            <div>
                <Header title="用户主页" backRouter="/home" history={createHashHistory()} isUserPage/>
                <UserInfo username={userinfo.username} city={userinfo.cityName}/>
                <OrderList username={userinfo.username}/>
            </div>
        )
    }
    componentDidMount() {
        // 如果未登录，跳转到登录页面
        let localstorageUser = localStore.getItem('username');
        if(this.props.userinfo.username || localstorageUser) {
            console.log('User组件，确认已登录');
        }
        else {
            this.props.history.push('/Login')
        }
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)