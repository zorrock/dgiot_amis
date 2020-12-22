import React from "react";
import { Helmet } from "react-helmet";
import lodash from "lodash";
import { Spin } from "antd";
import { amisRender, loadAmisPageByPath, loadReactPageByPath } from "@/utils/amis-utils";
import { base62Encode, getHtmlTitle, isReactPage, routerLocationToStr } from "@/components/Layout/utils/layouts-utils";
import styles from "./index.less";
import SimpleBarReact from "simplebar-react";
import classNames from "classnames";

interface BlankLayoutProps extends LayoutPageComponentProps {
  /** 当前Layout菜单数据 */
  layoutMenuData: LayoutMenuData;
  /** html页面title后缀 */
  htmlTitleSuffix?: string;
}

interface BlankLayoutState {
  /** 页面加载状态 */
  loading: boolean;
  /** 当前路由页面的LocationKey */
  currentLocationKey?: string;
  /** Amis组件挂载ID */
  mountedDomId?: string;
  /** 组件内容 */
  component?: any;
  /** 是否是React组件  */
  isReactComponent: boolean;
}

class BlankLayout extends React.Component<BlankLayoutProps, BlankLayoutState> {
  // /** Amis组件挂载ID */
  // protected readonly mountedDomId = lodash.uniqueId('amisId-');

  constructor(props: BlankLayoutProps) {
    super(props);
    this.state = {
      loading: true,
      isReactComponent: false,
    };
  }

  componentDidMount() {
    this.showPage();
  }

  componentDidUpdate(prevProps: Readonly<BlankLayoutProps>, prevState: Readonly<BlankLayoutState>, snapshot?: any) {
    this.showPage();
  }

  render() {
    const { currentLocationKey } = this.state;
    const { route, htmlTitleSuffix } = this.props;
    if (!currentLocationKey) return <div/>;
    return (
      <>
        <Helmet>
          <title>{getHtmlTitle(route, htmlTitleSuffix)}</title>
        </Helmet>
        {this.getPage()}
      </>
    );
  }

  // -----------------------------------------------------------------------------------

  protected getPage() {
    const { loading, mountedDomId, component, isReactComponent } = this.state;
    return (
      <Spin size={"default"} delay={200} spinning={loading} tip="页面加载中..." style={{ height: "100%" }} wrapperClassName={styles.spinWrapper}>
        <SimpleBarReact className={classNames(styles.simpleBar)} autoHide={true}>
          {
            isReactComponent ?
              (component?.default ? <component.default/> : <div/>) :
              <div id={mountedDomId} key={mountedDomId} className={styles.pageContent}/>
          }
        </SimpleBarReact>
      </Spin>
    );
  }

  // -----------------------------------------------------------------------------------

  protected showPage() {
    const { location, layoutMenuData } = this.props;
    if (!layoutMenuData.currentMenu) return;
    const { currentLocationKey } = this.state;
    const locationKey = base62Encode(routerLocationToStr(location));
    if (currentLocationKey === locationKey) return;
    const { pagePath } = layoutMenuData.currentMenu.runtimeRouter;
    const mountedDomId = lodash.uniqueId('amisId-');
    const isReactComponent = isReactPage(pagePath);
    if (!isReactComponent) window.currentAmisId = mountedDomId;
    this.setState(
      { loading: true, currentLocationKey: locationKey, mountedDomId, isReactComponent },
      async () => {
        let component: any;
        if (isReactComponent) {
          // react 组件
          component = await loadReactPageByPath(pagePath!);
        } else {
          // amis 组件
          component = await loadAmisPageByPath(pagePath!);
          amisRender(mountedDomId, component.schema);
        }
        this.setState({ loading: false, component });
      }
    );
  }
}

export { BlankLayoutProps, BlankLayoutState, BlankLayout };
