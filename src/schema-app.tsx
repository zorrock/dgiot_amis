import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { $rootMounted, initAppPage, loadPageByPath } from '@/utils/amis-utils';
import { getLocationHash } from '@/utils/utils';
import { NestSideLayout } from '@/layouts/NestSideLayout';

interface ReactPageProps {
  schemaPath?: string;
}

interface ReactPageState {

}

class ReactPage extends Component<ReactPageProps, ReactPageState> {
  private amisMountedId = "amis-root";

  constructor(props: ReactPageProps) {
    super(props);
    // this.state = {count: 0};
  }

  async componentDidMount() {
    const {schemaPath, ...resProps} = this.props;
    await loadPageByPath(this.amisMountedId, schemaPath!, resProps);
  }

  render() {
    return (
      <NestSideLayout>
        <div id={this.amisMountedId}/>
      </NestSideLayout>
    );
  }
}

initAppPage();
const schemaPath = getLocationHash();
ReactDOM.render(<ReactPage schemaPath={schemaPath}/>, $rootMounted);
