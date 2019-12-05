import React from 'react'
import { getListData } from '../../../utils/api'

import ListCompoent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import './style.scss'

class List extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            hasMore: false,
            isLoadingMore: false,
            page: 0
        }
    }
    render() {
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length
                    ? <ListCompoent data={this.state.data}/>
                    : <div>{/* 加载中... */}</div>
                }
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                    : ''
                }
            </div>
        )
    }
    componentDidMount() {
        // 获取首页数据
        this.loadFirstPageData()
    }
    // 获取首页数据
    loadFirstPageData() {
        const cityName = this.props.cityName
        const result = getListData(cityName, 0)
        this.resultHandle(result)
    }
    // 加载更多数据
    loadMoreData() {
        // 记录状态
        this.setState({
            isLoadingMore: true
        })

        const cityName = this.props.cityName
        const page = this.state.page
        const result = getListData(cityName, page)
        this.resultHandle(result)

        // page自增
        this.setState({
            page: page + 1,
            isLoadingMore: false
        })
    }
    // 处理数据
    resultHandle(result) {
        result.then(res => {
            return res.json()
        }).then(json => {
            const hasMore = json.hasMore
            const data = json.data

            this.setState({
                hasMore: hasMore,
                data: [...this.state.data, data]
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('猜你喜欢报错, ', ex.message)
            }
        })
    }
}

export default List