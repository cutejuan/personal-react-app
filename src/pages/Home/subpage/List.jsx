import React from 'react'
import api from '../../../utils/api'

import ListCompoent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import './style.scss'

const {getListData} = api;

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
            <div className="cainixihuan">
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.props.list.length
                    ? <ListCompoent data={this.props.list}/>
                    : <div>{/* 加载中... */}</div>
                }
                {
                    this.props.showLoad ? 
                    (<div style={{
                        width: '100%',
                        position: 'absolute',
                        left: '0',
                        bottom: '-41px',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)} />
                    </div>)
                    : null
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
        console.log('执行加载更多');
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
        result.then(res => res.json()
        ).then(json => {
            const hasMore = json.hasMore
            const data = json.data
            this.setState({
                hasMore,
                data: [...this.state.data, ...data]
            })
        }).catch(err => {
            console.error('猜你喜欢报错, ', err.message)
        })
    }
}

export default List