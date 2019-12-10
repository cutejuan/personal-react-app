import React, {PureComponent, lazy, Suspense}  from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import {createHashHistory} from 'history'
import {connect} from 'react-redux'

import LocalStore from './utils/localStore'
import {CITYNAME} from './utils/localStoreKey'

import Loading from './components/Loading/Loading'
import localStore from './utils/localStore'

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
      <div id="app"
        style={{overflow: 'hidden', width: '100%', height:'100%'}}>
        <Router history={createHashHistory()}>

          <Suspense fallback={<Loading title="加载中"/>}>

            <Switch>

              <Route path="/" exact component={Home} />
              <Route path='/city' component={City}/>
              <Route path='/Login' component={Login}/>
              {/* <Route path='/Login/(:router)' component={Login}/> */}
              <Route path='/User' component={User}/>
              <Route path='/search/:category' component={Search}/>
              {/* <Route path='/search/:category(/:keyword)' component={Search}/> */}
              <Route path='/detail/:id' component={Detail}/>
              <Route path='*' component={NotFound}/>

            </Switch>

          </Suspense>

        </Router>
      </div>
    )
  }

  componentDidMount(){
    

    // 获取位置信息
    let cityName = LocalStore.getItem(CITYNAME)
    if (cityName == null) {
        cityName = '北京'
    }

    // 获取用户名
    let username = localStore.getItem('username');

    // 本地数据存到仓库里
    if (username) {
      this.props.userUpdate({cityName,username})
    } else {
      this.props.userUpdate({cityName})
    }

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
		userUpdate(data){
      dispatch({
        type: 'userinfoUpdate',
        value: data
      })
    }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);