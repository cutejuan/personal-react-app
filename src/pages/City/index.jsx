import React from 'react'
import { connect } from 'react-redux'

import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'


import { CITYNAME } from '../../utils/localStoreKey'
import localStore from '../../utils/localStore'

class City extends React.PureComponent {
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

        console.log(this.props.userUpdate);

        this.props.userUpdate(userinfo)

        // 修改 cookie
        localStore.setItem(CITYNAME, newCity)

        // 跳转页面
        this.props.history.push('/')
    }
}

const mapStateToProps = (state)=> {
    return {
        userinfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch)=> {
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
)(City)