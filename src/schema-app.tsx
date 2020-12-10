import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { $rootMounted, initAppPage, loadPageByPath } from '@/utils/amis-utils';
import { getLocationHash } from '@/utils/utils';

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
    // const {count} = this.state;
    return (
      <div style={{height: "100%"}}>
        {/*<button onClick={() => {*/}
        {/*  this.setState({count: count + 1});*/}
        {/*  if (count > 3) {*/}
        {/*    this.reload();*/}
        {/*  }*/}
        {/*}}>{count}</button>*/}
        <div id={this.amisMountedId}/>
      </div>
    );
  }
}

initAppPage();
const schemaPath = getLocationHash();
ReactDOM.render(<ReactPage schemaPath={schemaPath}/>, $rootMounted);
