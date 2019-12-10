import React from 'react'

import Item from './Item'

import './style.scss'

class List extends React.PureComponent {
    render() {
        return (
            <div className="list-container">
                {this.props.data.map((item, index) => {
                    return <Item key={index} data={item}/>
                })}
            </div>
        )
    }
}

export default List