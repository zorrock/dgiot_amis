import React from 'react';
// import { CopyrightCircleOutlined } from '@ant-design/icons';
// import { PageHeaderModel, SideFirstMenuMode } from '@/components/Layout';
import NestSideMenuLayout from './NestSideMenuLayout';

export interface NestSideLayoutProps extends LayoutPageComponentProps {

}

export interface NestSideLayoutState {

}

class NestSideLayout extends React.Component<NestSideLayoutProps, NestSideLayoutState> {
  render() {
    const {children, ...otherProps} = this.props;
    return (
      <NestSideMenuLayout
        {...otherProps}
        // // 全局配置
        // htmlTitleSuffix="Ant-Layout"
        // hideGlobalHeader={true}
        // hideGlobalFooter={false}
        // headerHeight={40}
        // sideMenuWidth={160}
        // enableLocale={false}
        // defaultOpen={true}
        // menuIconScriptUrl="//at.alicdn.com/t/font_1326886_bbehrpsvyl.js"
        // // breadcrumbRoutesInterceptor={(layoutMenuData, routes) => (routes ?? []).filter((value, index) => index >= 1)}
        // // 侧边栏 - 一级菜单
        // globalSideLogo={<img src={logo} alt="logo" style={{ width: 32 }} />}
        // globalSideMenuMode={SideFirstMenuMode.AntdMenu}
        // globalSideMenuWidth={120}
        // // 侧边栏 - 二级菜单
        // sideMenuEnableSearchMenu={false}
        // sideMenuBeautifyScrollbar={true}
        // sideMenuAutoHideScrollbar={true}
        // // 内容区域
        // pageContentPageHeaderModel={PageHeaderModel.AntPageHeader}
        // pageContentEnablePageHeader={false}
        // pageContentShowHomeButton={true}
        // pageContentShowMoreButton={true}
        // pageContentBeautifyScrollbar={true}
        // pageContentAutoHideScrollbar={false}
        // // 页脚区域
        // // globalFooterLinks={[
        // //   { key: '1', title: '连接1', href: '', style: { color: 'red' } },
        // //   { key: '2', title: '连接2', href: '' },
        // //   { key: '3', title: '连接3', href: '' },
        // // ]}
        // globalFooterCopyright={
        //   <>
        //     Copyright <CopyrightCircleOutlined /> 2019 武汉XX科技有限公司 鄂ICP备19029XXX号
        //   </>
        // }
      >
        {children}
      </NestSideMenuLayout>
    );
  }
}

export default NestSideLayout;
