import React from 'react'

import { getInfoData } from '../../../utils/api'
import DetailInfo from '../../../components/DetailInfo'

class Info extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            info: false
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.info
                    ? <DetailInfo data={this.state.info}/>
                    : ''
                }
            </div>
        )
    }
    componentDidMount() {
        // 获取商户信息
        this.getInfo()
    }
    getInfo() {
        const id = this.props.id
        const result = getInfoData(id)
        result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                info: json
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取商户信息出错')
            }
        })
    }
}

export default Info