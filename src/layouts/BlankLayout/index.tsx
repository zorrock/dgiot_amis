import React from "react";
import { Helmet } from "react-helmet";
import lodash from "lodash";
import { Spin } from "antd";
import { amisRender, loadAmisPageByPath, loadReactPageByPath } from "@/utils/amis-utils";
import { base62Encode, getHtmlTitle, isReactPage, routerLocationToStr } from "@/components/Layout/utils/layouts-utils";
import styles from "./index.less";
import SimpleBarReact from "simplebar-react";
import classNames from "classnames";
import { logger } from "@/utils/logger";

const log = logger.getLogger("src/layouts/BlankLayout/index.tsx");

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
    log.info("BlankLayout render");
    const { route, htmlTitleSuffix, layoutMenuData: { currentMenu } } = this.props;
    if (!currentMenu) return "BlankLayout - 404";
    const { currentLocationKey } = this.state;
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
      <Spin size={"large"} delay={200} spinning={loading} tip="页面加载中..." style={{ height: "100%" }} wrapperClassName={styles.spinWrapper}>
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
    const { currentLocationKey } = this.state;
    const { location, layoutMenuData: { currentMenu } } = this.props;
    if (!currentMenu) {
      if (currentLocationKey) {
        this.setState({ loading: false, currentLocationKey: undefined, mountedDomId: undefined });
      }
      return;
    }
    const locationKey = base62Encode(routerLocationToStr(location));
    if (currentLocationKey === locationKey) return;
    const { pagePath } = currentMenu.runtimeRouter;
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
          console.log("component.schema", component.schema)
          amisRender(mountedDomId, component.schema);
        }
        this.setState({ loading: false, component });
      }
    );
  }
}

export { BlankLayoutProps, BlankLayoutState, BlankLayout };
