import { Button, Result } from 'antd';
import React from 'react';

const ForbiddenPage: React.FC = () => (
  <Result
    status={"403"}
    title="403"
    subTitle={<div style={{ fontSize: 14, fontWeight: "bold" }}>抱歉，您无权访问此页面。</div>}
    extra={
      <Button type="primary" onClick={() => history.back()}>
        返回上一页
      </Button>
    }
  />
);

export default ForbiddenPage;
