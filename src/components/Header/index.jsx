import React from 'react'

import './style.scss'

class Header extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div id="common-header">
                <span className="back-icon" onClick={this.clickHandle.bind(this)}>
                    <i className="icon-chevron-left"></i>
                </span>
                <h1>{this.props.title}</h1>
            </div>
        )
    }
    clickHandle() {
		this.props.history.back();
        // const backRouter = this.props.backRouter
        // if (backRouter) {
        //     hashHistory.push(hashHistory)
        // } else {
        //     window.history.back()
        // }
    }
}

export default Header