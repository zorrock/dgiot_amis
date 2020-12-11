import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { $rootMounted, initAppPage, loadPageByPath } from '@/utils/amis-utils';
import { getLocationHash } from '@/utils/utils';
import { NestSideLayout } from '@/layouts/NestSideLayout';

interface ReactPageProps {
  schemaPath?: string;
}

interface ReactPageState {
  count: number;
}

class ReactPage extends Component<ReactPageProps, ReactPageState> {
  private amisMountedId = "amis-root";

  constructor(props: ReactPageProps) {
    super(props);
    this.state = {count: 0};
  }

  async componentDidMount() {
    const {schemaPath, ...resProps} = this.props;
    await loadPageByPath(this.amisMountedId, schemaPath!, resProps);
  }

  render() {
    const {count} = this.state;
    return (
      <NestSideLayout>
        <button onClick={() => this.setState({count: count + 1})}>{count}</button>
        <div key={"aaaa"} data-a={count} id={this.amisMountedId}/>
      </NestSideLayout>
    );
  }
}

initAppPage();
const schemaPath = getLocationHash();
ReactDOM.render(<ReactPage schemaPath={schemaPath}/>, $rootMounted);
