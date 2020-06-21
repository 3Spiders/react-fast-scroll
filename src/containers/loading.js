import React, { Component } from 'react';
import loadingImg from './loading.gif';
import './loading.less';

class Loading extends Component {
  render() {
    return (
      <div className="container">
        <img src={loadingImg} alt="loading" />
      </div>
    );
  }
}

export default Loading;
