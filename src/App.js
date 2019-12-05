import React, {PureComponent, lazy, Suspense}  from 'react'
import {Router, Route, Redirect, Switch} from 'react-router-dom'
import {createHashHistory} from 'history'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import LocalStore from './utils/localStore'
import {CITYNAME} from './utils/localStoreKey'
import {userUpdate} from '/src/store/userinfoReducer.js'

import Loading from './components/Loading/Loading'
const Home = lazy(()=>import('./pages/Home'))
const City = lazy(()=>import('./pages/City'))
const Login = lazy(()=>import('./pages/Login'))
const User = lazy(()=>import('./pages/User'))
const Search = lazy(()=>import('./pages/Search'))
const Detail = lazy(()=>import('./pages/Detail'))
const NotFound = lazy(()=>import('./pages/404'))

class App extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
        initDone: false
    }
  }

  render() {
    return (
		<Router history={createHashHistory()}>
		  <Suspense fallback={<Loading />}>
			  <Switch>
				<Route path="/" exact component={Home} />
				<Route path='/city' component={City}/>
				<Route path='/Login(/:router)' component={Login}/>
				<Route path='/User' component={User}/>
				<Route path='/search/:category(/:keyword)' component={Search}/>
				<Route path='/detail/:id' component={Detail}/>
				<Route path='*' component={NotFound}/>
		      </Switch>
		  </Suspense>
		</Router>
    )
  }

  componentDidMount(){
    // 获取位置信息
    let cityName = LocalStore.getItem(CITYNAME)
    if (cityName == null) {
        cityName = '北京'
    }
    this.props.userInfoActions.update({
        cityName: cityName
    })

    // 更改状态
    this.setState({
        initDone: true
    })
  }
}


const mapStateToProps = (state)=>{
  return {}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		userInfoActions: bindActionCreators(userUpdate, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);