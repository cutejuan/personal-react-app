import React from 'react'
import HomeAd from '../../../components/HomeAd/index'
import API from '../../../utils/api'
const {getAdData} = API

class Ad extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
    }
    render() {
        return (
            <div>
            {
                this.state.data.length
                ? <HomeAd data={this.state.data}/>
                : <div>{/* 加载中... */}</div>
            }
            </div>
        )
    }
    componentDidMount() {
        // 获取广告数据
        const result = getAdData();
        result.then(res=>res.json())
        .then(json => {
            // 处理获取的数据
            const data = json
            if (data.length) {
                this.setState({
                    data: data
                })
            }
        }).catch(ex => {
            // 发生错误
            console.error('首页广告模块获取数据报错, ', ex.message)
        })
    }
}

export default Ad