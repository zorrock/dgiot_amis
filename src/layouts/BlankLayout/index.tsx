import React from "react";
import { Helmet } from "react-helmet";
import lodash from "lodash";
import classNames from "classnames";
import { Spin } from "antd";
import SimpleBarReact from "simplebar-react";
import { logger } from "@/utils/logger";
import { amisRender, loadAmisPageByPath, loadReactPageByPath } from "@/utils/amis-utils";
import { IFramePage } from "@/components/IFramePage";
import { base62Encode, getHtmlTitle, getPageType, routerLocationToStr } from "@/components/Layout/utils/layouts-utils";
import styles from "./index.less";

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
  /** 页面组件类型  */
  pageType: TabPageType;
}

class BlankLayout extends React.Component<BlankLayoutProps, BlankLayoutState> {
  // /** Amis组件挂载ID */
  // protected readonly mountedDomId = lodash.uniqueId('amisId-');

  constructor(props: BlankLayoutProps) {
    super(props);
    this.state = {
      loading: true,
      pageType: "amis",
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
    const { loading, mountedDomId, component, pageType } = this.state;
    const { layoutMenuData: { currentMenu } } = this.props;
    if (currentMenu && pageType === "iframe") {
      return (
        <IFramePage
          defaultSrc={currentMenu.runtimeRouter.pagePath}
          style={{ height: "100%" }}
          spinProps={{ size: "large", tip: "页面加载中..." }}
        />
      );
    }
    return (
      <Spin size={"large"} delay={200} spinning={loading} tip="页面加载中..." style={{ height: "100%" }} wrapperClassName={styles.spinWrapper}>
        <SimpleBarReact className={classNames(styles.simpleBar)} autoHide={true}>
          {
            pageType === "react" ?
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
    const pageType = getPageType(currentMenu.runtimeRouter);
    if (pageType === "amis") window.currentAmisId = mountedDomId;
    this.setState(
      { loading: true, currentLocationKey: locationKey, mountedDomId, pageType },
      async () => {
        let component: any;
        if (pageType === "react") {
          // react 组件
          component = await loadReactPageByPath(pagePath!);
        } else if (pageType === "amis") {
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
