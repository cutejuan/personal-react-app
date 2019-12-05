import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import HomeHeader from '../../components/HomeHeader'
import Category from '../../components/Category'
import Ad from './subpage/Ad'
import List from './subpage/List'

class Home extends PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                <HomeHeader history={this.props.history} cityName={this.props.userinfo.cityName}/>
                <Category/>
                <div style={{height: '15px'}}>{/* 分割线 */}</div>
                <Ad/>
                <List cityName={this.props.userinfo.cityName}/>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        userinfo: state.userinfo
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)