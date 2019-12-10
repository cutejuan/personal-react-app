import React from 'react'
import { connect } from 'react-redux'

import ListCompoent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import api from '../../../utils/api'
const {getSearchData} = api;

const initialState = {
    data: [],
    hasMore: false,
    isLoadingMore: false,
    page: 0
}

class SearchList extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = initialState
    }
    render() {
        return (
            <div>
                {
                    this.state.data.length
                    ? <ListCompoent data={this.props.searchlist}/>
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
        const cityName = this.props.userinfo.cityName
        const keyword = this.props.keyword || ''
        const category = this.props.category
        const result = getSearchData(0, cityName, category, keyword)
        this.resultHandle(result)
    }
    // 加载更多数据
    loadMoreData() {
        // 记录状态
        this.setState({
            isLoadingMore: true
        })

        const cityName = this.props.userinfo.cityName
        const page = this.state.page
        const keyword = this.props.keyword || ''
        const category = this.props.category
        const result = getSearchData(page, cityName, category, keyword)
        this.resultHandle(result)

        // 更新状态
        this.setState({
            isLoadingMore: false
        })
    }
    // 处理数据
    resultHandle(result) {
        // 增加 page 计数
        const page = this.state.page
        this.setState({
            page: page + 1
        })

        result.then(res => {
            return res.json()
        }).then(json => {
            
            const hasMore = json.hasMore
            const data = json.data
            this.setState({
                hasMore: hasMore,
                data: [...this.state.data, ...data]
            })
        }).catch(ex => {
            console.error('搜索页报错, ', ex.message)
        })
    }
    // 处理重新搜索
    componentDidUpdate(prevProps, prevState) {
        const keyword = this.props.keyword
        const category = this.props.category

        // 搜索条件完全相等时，return
        if (keyword === prevProps.keyword && category === prevProps.category) {
            return
        }

        // 重置 state
        this.setState(initialState)

        // 重新加载数据
        this.loadFirstPageData()
    }
}

function mapStateToProps(state=initialState) {
    return {
        userinfo: state.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList)