import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render as amisRender } from 'amis';
import 'amis/lib/themes/default.css';

// const amis = require('amis');

interface DemoPageProps {
  match?: any;
}

interface DemoPageState {
  loading: boolean;
}

console.log('react --> ###');

type Schema = Page | Form;

enum ComponentType {
  /** 页面 */
  page = "page",
  /** 表单 */
  form = "form",
}

interface AmisComponent {

}

interface Page extends AmisComponent {
  /** 组件类型 */
  type: ComponentType.page,
  /** 页面标题 */
  title: string,
  /** 页面内容 */
  body: string | Array<Schema> | Schema;
}

interface Form extends AmisComponent {
  /** 组件类型 */
  type: ComponentType.form,
  /** 表单布局模式 */
  mode: "horizontal";
  /** 表单提交api地址 */
  api: string;
  /** 表单项 */
  controls: Array<FormControl>;
}

interface FormControl {
  /** 表单项类型 */
  type: string;
  /** 表单项label */
  label: string;
  /** 表单项字段名 */
  name: string;
}

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

ReactDOM.render(<DemoPage/>, document.getElementById('root'));

// export default DemoPage;























