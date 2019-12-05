import React from 'react'

import Header from '../../components/Header'
import Info from './subpage/Info'
import Buy from './subpage/buy'
import Comment from './subpage/Comment'

class Detail extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        // 获取商户ID
        const id = this.props.params.id

        return (
            <div>
                <Header title="商户详情" type="share"/>
                <Info id={id}/>
                <Buy history={this.props.history} id={id}/>
                <Comment id={id}/>
            </div>
        )
    }
}
 
export default Detail