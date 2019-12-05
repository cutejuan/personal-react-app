import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'

import {userUpdate} from '../../store/userinfoReducer.js'

import { CITYNAME } from '../../utils/localStoreKey'
import localStore from '../../util/localStore'

class City extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                <Header history={this.props.history} title="选择城市"/>
                <CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }
    changeCity(newCity) {
        if (newCity == null) {
            return
        }
        // 修改 redux
        const userinfo = this.props.userinfo
        userinfo.cityName = newCity
        this.props.userInfoActions.update(userinfo)

        // 修改 cookie
        localStore.setItem(CITYNAME, newCity)

        // 跳转页面
        this.props.history.push('/')
    }
}

const mapStateToProps = (state)=> {
    return {
        userinfo: state.userinfo
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        userInfoActions: bindActionCreators(userUpdate, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)