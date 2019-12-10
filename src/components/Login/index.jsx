import React from 'react'

import './style.scss'

import Loading from '../Loading/Loading'

class Login extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            isToast: false,
            title: ''
        }
    }
    render() {
        return (
            <div id="login-container">
                <div className="input-container phone-container">
                    <i className="icon-tablet"></i>
                    <input 
                        type="text" 
                        placeholder="请输入手机号" 
                        onChange={this.changeHandle.bind(this)} 
                        value={this.state.username}
                        ref={(el)=>{this.user = el}}
                    />
                </div>
                <div className="input-container password-container">
                    <i className="icon-key"></i>
                    <button onClick={this.sendAction.bind(this)}>发送验证码</button>
                    <input type="text" placeholder="输入验证码" ref={(el)=>{this.code=el}} />
                </div>
                <button className="btn-login" onClick={this.clickHandle.bind(this)}>登录</button>

                {
                    this.state.isToast?
                    <Loading title={this.state.title} />
                    : null
                }
            </div>
        )
    }
    changeHandle(e) {
        this.setState({
            username: e.target.value
        })
    }
    sendAction(){
        if (this.user.value.length===11){
            this.setState({
                isToast: true,
                title: '发送成功'
            },()=>{
                setTimeout(()=>{
                    this.setState({
                        isToast: false
                    })
                },1200)
            })
        } else{
            this.setState({
                isToast: true,
                title: '请输入正确的号码'
            },()=>{
                setTimeout(()=>{
                    this.setState({
                        isToast: false
                    })
                },1500)
            })
        }
        
    }
    clickHandle() {
        if(this.user.value.length===11 && this.code.value){

            const username = this.state.username
            
            this.props.loginHandle(username)
        } else {
            this.setState({
                isToast: true,
                title: '您的输入不正确'
            },()=>{
                setTimeout(()=>{
                    this.setState({
                        isToast: false
                    })
                },1500)
            })
        }
        
    }
}

export default Login