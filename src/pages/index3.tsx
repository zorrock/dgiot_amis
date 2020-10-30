import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render as amisRender } from 'amis';
import 'amis/lib/themes/default.css';

interface DemoPageProps {
  match?: any;
}

interface DemoPageState {
  loading: boolean;
}

console.log('react --> ');

class DemoPage extends Component<DemoPageProps, DemoPageState> {
  state: DemoPageState = {
    loading: true,
  };

  render() {
    const {loading} = this.state;
    // eslint-disable-next-line no-console
    return (
      <div>
        <button onClick={event => this.setState({loading: !loading})}>点击</button>
        {loading && "加载中..."}
        <br/>
        {
          amisRender({
            type: "page",
            title: "表单页面",
            body: {
              type: "form",
              mode: "horizontal",
              api: "https://houtai.baidu.com/api/mock2/form/saveForm",
              controls: [
                {
                  label: "Name",
                  type: "text",
                  name: "name"
                },
                {
                  label: "Email",
                  type: "email",
                  name: "email"
                }
              ]
            }
          }, {}, {})
        }
      </div>
    );
  }
}

ReactDOM.render(<DemoPage/>, document.getElementById('root'));

// export default DemoPage;
