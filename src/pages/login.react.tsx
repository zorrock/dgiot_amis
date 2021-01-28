import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, Layout, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { request } from "@/utils/request";
import { routerHistory } from "@/utils/router";
import logo from "@/assets/images/logo.png";
import { layoutSettings } from "@/router-config";
import styles from "./login.react..less";
import { UserSecurityContext } from "@/utils/utils";
import { logger } from "@/utils/logger";

const log = logger.getLogger("src/pages/login.react.tsx");

interface LoginPageProps {
}

interface LoginPageState {
  /** 页面加载状态 */
  loading: boolean;
}

class LoginPage extends Component<LoginPageProps, LoginPageState> {

  constructor(props: LoginPageProps) {
    super(props);
    this.state = { loading: false };
  }

  /** 登录请求 */
  protected login = (values: any) => {
    if (!layoutSettings.loginApi) {
      message.warn("未配置layoutSettings.loginApi").then();
      return;
    }
    this.setState({ loading: true });
    request.post(layoutSettings.loginApi, values)
      .then(({ success, userInfo, message }) => {
        if (!success || !userInfo) {
          message.error(message || "用户名/密码错误").then();
          return;
        }
        message.success(message || "登录成功").then();
        // const { extInfo = {}, ...restProps } = userInfo;
        // window.currentUser = { ...restProps, ...extInfo };
        // 获取登录用户角色权限信息
        if (layoutSettings.currentUserApi) {
          this.getCurrentUser(() => this.refreshMenu());
        } else {
          this.refreshMenu();
        }
      }).finally(() => this.setState({ loading: false }));
  }

  protected getCurrentUser(callback?: () => void) {
    if (!layoutSettings.currentUserApi) return;
    request.get(layoutSettings.currentUserApi).then(securityContext => {
      log.info("getCurrentUser -> ", securityContext);
      const { userInfo, roles = [], permissions = [] } = securityContext;
      const { extInfo = {}, ...restProps } = userInfo;
      window.currentUser = { ...restProps, ...extInfo };
      window.securityContext = new UserSecurityContext(userInfo, roles, permissions);
    });
    window.appComponent.refreshMenu(() => {
      if (layoutSettings.defaultPath) routerHistory.push({ hash: layoutSettings.defaultPath });
    }).then(callback);
  }

  protected refreshMenu() {
    window.appComponent.refreshMenu(() => {
      if (layoutSettings.defaultPath) routerHistory.push({ hash: layoutSettings.defaultPath });
    }).then();
  }

  render() {
    const { loading } = this.state;
    return (
      <Layout className={styles.login}>
        {/*内容*/}
        <Layout.Content>
          {/*logo*/}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "96px 0 8px 0" }}>
            <img src={logo} style={{ marginRight: 8, width: 48 }} alt="logo"/>
            <span style={{ fontSize: 32, fontWeight: "bold" }}>Amis Admin</span>
          </div>
          <div style={{ width: "100%", textAlign: "center", color: "rgba(0, 0, 0, 0.45)", marginBottom: 40 }}>
            Amis 是一个低代码前端框架，可以减少页面开发工作量，极大提升效率
          </div>
          {/*登录表单*/}
          <Form name="loginForm" className={styles.loginForm} size={"large"} onFinish={this.login} initialValues={{ remember: true }}>
            <div style={{ fontSize: 14, margin: "16px 8px", textAlign: "center" }}>账户密码登录</div>
            <Form.Item name="username" style={{ height: 56, marginBottom: 0 }} rules={[{ required: true, message: '请输入您的用户名！' }]}>
              <Input prefix={<UserOutlined/>} placeholder="用户名" readOnly={loading}/>
            </Form.Item>
            <Form.Item name="password" style={{ height: 48, marginBottom: 0 }} rules={[{ required: true, message: '请输入您的密码！' }]}>
              <Input.Password prefix={<LockOutlined/>} placeholder="密码" readOnly={loading}/>
            </Form.Item>
            <Form.Item style={{ height: 40, marginBottom: 0 }}>
              <Form.Item name="remember" valuePropName="checked" noStyle={true}>
                <Checkbox style={{ userSelect: "none" }} disabled={loading}>自动登录</Checkbox>
              </Form.Item>
              <a style={{ float: "right", userSelect: "none" }}>忘记密码</a>
            </Form.Item>
            <Form.Item>
              <Button type={"primary"} htmlType={"submit"} style={{ width: "100%" }} loading={loading}>登录</Button>
            </Form.Item>
          </Form>
        </Layout.Content>
        {/*底部*/}
        <Layout.Footer>
        </Layout.Footer>
      </Layout>
    );
  }
}

export default LoginPage;
