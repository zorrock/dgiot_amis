import React, { Component } from 'react';
import ReactDOM from 'react-dom';

interface DemoPageProps {
  match?: any;
}

interface DemoPageState {
  loading: boolean;
}

console.log('react --> ###');

class DemoPage extends Component<DemoPageProps, DemoPageState> {
  state: DemoPageState = {
    loading: true,
  };

  render() {
    const {loading} = this.state;
    return (
      <div>
        <button onClick={event => this.setState({loading: !loading})}>点击</button>
        {loading && "加载中..."}
        <br/>
      </div>
    );
  }
}

const $mounted = document.getElementById('app-root');
ReactDOM.render(<DemoPage/>, $mounted);
