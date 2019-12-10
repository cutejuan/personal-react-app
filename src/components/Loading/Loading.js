import React, { Component } from 'react'
import './style.scss'

export default class Loading extends Component {
  render() {
    return (
      <div id="loading" onClick={this.handleClick.bind(this)}>
      <p>{this.props.title}</p>
      </div>
    )
  }
  handleClick(e){
    e.preventDefault();
  }
}