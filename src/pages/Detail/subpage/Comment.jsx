import React from 'react'
import { getCommentData } from '../../../utils/api'

import ListComponent from '../../../components/CommentList'
import LoadMore from '../../../components/LoadMore'

import './style.scss'

class Comment extends React.PureComponent {
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
            <div className="detail-comment-subpage">
                <h2>用户点评</h2>
                {
                    this.state.data.length
                    ? <ListComponent data={this.state.data}/>
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
        this.loadFirstPageData();
    }
    // 获取首页数据
    loadFirstPageData() {
        const id = this.props.id
        const result = getCommentData(0, id)
        this.resultHandle(result)
    }
    // 加载更多数据
    loadMoreData() {
        // 记录状态
        this.setState({
            isLoadingMore: true
        })

        const id = this.props.id
        const page = this.state.page
        const result = getCommentData(page, id)
        this.resultHandle(result)

        // 增加 page 技术
        this.setState({
            isLoadingMore: false
        })
    }
    // 处理数据
    resultHandle(result) {
        result.then(res => {
            return res.json()
        }).then(json => {
            // 增加 page 
            const page = this.state.page
            this.setState({
                page: page + 1
            })

            const hasMore = json.hasMore
            const data = json.data

            this.setState({
                hasMore: hasMore,
                data: [
					...this.state.data,
					data
				]
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('用户评论出错, ', ex.message)
            }
        })
    }
}

export default Comment