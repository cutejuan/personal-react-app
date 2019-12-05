import React from 'react'

import SearchHeader from '../../components/SearchHeader'
import SearchList from './subpage/List'

class Search extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const params = this.props.params
        return (
            <div>
                <SearchHeader history={this.props.history} keyword={params.keyword}/>
                <SearchList keyword={params.keyword} category={params.category}/>
            </div>
        )
    }
}

export default Search