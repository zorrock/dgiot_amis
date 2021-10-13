import React, { Component } from "react";
import { Card, Table} from 'antd';
import { request } from '@/utils/request';
import {iotapi} from "@/pages/amis/server-api";
// antd 文档 https://ant.design/components/table-cn/
// react 生命周期 https://react.docschina.org/docs/react-component.html
interface DemoPageProps extends ReactPageComponentProps {
}

interface DemoPageState {
  loading: boolean;
  count: number;
  dataSource: any;
  columns: any
}


class DemoPage extends Component<DemoPageProps, DemoPageState> {
  state: DemoPageState = {
    loading: true,
    count: 0,
    dataSource:[],
    columns: [
      {
        title: '设备id',
        dataIndex: 'objectId',
        key:'objectId'
      },
      {
        title: '设备名称',
        dataIndex: 'name',
        key:'name'
      },
      {
        title: '设备地址',
        dataIndex: 'devaddr',
        key:'devaddr'
      },
      {
        title: 'ip地址',
        dataIndex: 'ip',
      },
      {
        title: '设备状态',
        dataIndex: 'status',
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
      },
    ],
  };
  componentDidMount() {
    this.getData();
  }
  // componentDidUpdate(prevProps: Readonly<ReactPageProps>, prevState: Readonly<ReactPageState>, snapshot?: any) {
  //   this.getData();
  // }
  protected getData() {
    const params = {
      "limit":	20,
      "skip":	0,
      "order":	'-createdAt',
      "include":	'product,name',
      "where"	:{"product":{"$ne":null},"name":{"$ne":null,"$exists":true}}
    }
    this.setState({ loading: true })
    request.get(`${iotapi}/iotapi/classes/Device`, { params })
      .then(
        res =>{
          this.setState({ loading: false })
          this.setState({ dataSource:res.results})
        }
      ).finally(()=>
        this.setState({ loading: false })
        );
  }
  render() {
    const { dataSource,loading,columns} = this.state;
    return (
      <Card bordered={false}>
        <Table loading={loading} dataSource={dataSource} columns={columns} />;
      </Card>
    );
  }
}

export default DemoPage;
