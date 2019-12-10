import React from 'react'
import OrderListComponent from '../../../components/OrderList'

import './style.scss'
import api from '../../../utils/api'

const { getOrderListData, postComment } = api;

class OrderList extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
    }
    render() {
        return (
            <div className="order-list-container">
                <h2>您的订单</h2>
                {
                    this.state.data.length
                    ? <OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
                    : <div>{/* loading */}</div>
                }
            </div>
        )
    }
    componentDidMount() {
        // 获取订单数据
        const username = this.props.username
        if (username) {
            this.loadOrderList(username)
        }
    }
    // 获取列表数据
    loadOrderList(username) {
        const result = getOrderListData(username)
        
        result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                data: json
            })
        }).catch(ex => {
            console.error('用户主页“订单列表”获取数据报错, ', ex.message)
        })
    }
    // 提交评价
    submitComment(id , value, star, callback) {
        const result = postComment(id, value, star)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.errno === 0) {
                // 已经评价，修改状态
                callback()
            }
        })
    }
}

export default OrderList