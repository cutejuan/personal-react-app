import React from 'react'

import Item from './Item'

class OrderList extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const data = this.props.data
        const submitComment = this.props.submitComment

        return (
            <div>
                {data.map((item, index) => {
                    return <Item key={index} data={item} submitComment={submitComment}/>
                })}
            </div>
        )
    }
}

export default OrderList