import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render as amisRender } from 'amis';
import { ComponentType, Schema } from "@/amis-types";

interface DemoPageProps {
  match?: any;
}

interface DemoPageState {
  loading: boolean;
}

console.log('react --> ###');

const schema: Schema = {
  type: ComponentType.page,
  title: "表单页面",
  body: [
    {
      type: ComponentType.form,
      mode: "horizontal",
      api: "https://houtai.baidu.com/api/mock2/form/saveForm",
      controls: [
        {
          label: "Name",
          type: "text",
          name: "name"
        },
        {label: "Email", type: "email", name: "email"},
      ],
    },
  ],
}

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
        {
          amisRender(schema, {}, {})
        }
      </div>
    );
  }
}

const $mounted = document.getElementById('root') || document.createElement('div')
ReactDOM.render(<DemoPage/>, $mounted);

// export default DemoPage;























