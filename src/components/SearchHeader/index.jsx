import React from 'react'

import SearchInput from '../SearchInput'

import './style.scss'

class SearchHeader extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div id="search-header" className="clear-fix">
                <span className="back-icon float-left" onClick={this.clickHandle.bind(this)}>
                    <i className="icon-chevron-left"></i>
                </span>
                <div className="input-container">
                    <i className="icon-search"></i>
                    &nbsp;
                    <SearchInput value={this.props.keyword || ''} enterHandle={this.enterHandle.bind(this)}/>
                </div>
            </div>
        )
    }
    clickHandle() {
        window.history.back()
    }
    enterHandle(value) {
        this.props.history.push('/search/all/' + encodeURIComponent(value))
    }
}

export default SearchHeader