import React from 'react'

import './style.scss'

class HomeAd extends React.PureComponent {
    render() {
        return (
            <div id="home-ad">
                <h2>超值特惠</h2>
                <div className="ad-container clear-fix">
                    {this.props.data.map((item, index) => {
                        return (<div key={index} className="ad-item float-left">
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <img src={item.img} alt={item.title}/>
                            </a>
                        </div>)
                    })}
                </div>
            </div>
        )
    }
}

export default HomeAd