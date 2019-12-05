import React from 'react'
import { connect } from 'react-redux'

import Header from '../../components/Header'
import UserInfo from '../../components/UserInfo'
import OrderList from './subpage/OrderList'

class User extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const userinfo = this.props.userinfo
        return (
            <div>
                <Header title="用户主页" backRouter="/home"/>
                <UserInfo username={userinfo.username} city={userinfo.cityName}/>
                <OrderList username={userinfo.username}/>
            </div>
        )
    }
    componentDidMount() {
        // 如果未登录，跳转到登录页面
        if (!this.props.userinfo.username) {
            this.props.history.push('/Login')
        }
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
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