import React from 'react';
import { PageContext, PageContextProps } from '../PageContext';

interface PageContentProps extends PageContextProps {
}

interface PageContentState {
  // /** 是否存在滚动条 */
  // multiTabNavHasScroll: boolean;
  // /** 多页签容器scrollLeft值 */
  // multiTabNavMultiTabScrollLeft?: number;
}

class PageContent extends React.Component<PageContentProps, PageContentState> {
  // state = {
  //   multiTabNavHasScroll: false,
  //   multiTabNavMultiTabScrollLeft: undefined,
  // };

  public render() {
    const {children, ...globalContextProps} = this.props;
    const customContextProps: Partial<PageContextProps> = {};
    return (
      <PageContext.Provider key="pageContext.Provider" value={{...globalContextProps, ...customContextProps}}>
        {children}
      </PageContext.Provider>
    );
  }
}

export { PageContentProps, PageContentState, PageContent };
