import React, { Component } from "react";

interface DemoPageProps {
  match?: any;
  param: any;
}

interface DemoPageState {
  loading: boolean;
  count: number;
}


class DemoPage extends Component<DemoPageProps, DemoPageState> {
  state: DemoPageState = {
    loading: true,
    count: 0
  };

  render() {
    const { param } = this.props;
    // console.log("param", param);
    const { loading, count } = this.state;
    return (
      <div>
        <button onClick={event => this.setState({ loading: !loading, count: (count + 1) })}>点击{count}</button>
        <br/>
        {loading && "加载中..."}
        <br/>
        {JSON.stringify(param)}
      </div>
    );
  }
}

export default DemoPage;
