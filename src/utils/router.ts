import lodash from 'lodash';
import { LayoutConfig } from "@/router-config";

type HistoryState = RouterLocation['state'];

/** 路由跳转工具类 */
class RouterHistory {
  private static getHash(hash: string): string | undefined {
    hash = lodash.trim(hash);
    if (!hash || hash.length <= 0) return;
    if (hash.startsWith("#")) hash = hash.substring(1);
    return hash;
  }

  /**
   * 全局路由的状态数据
   * <pre>
   *   Map<Location.hash, state>
   * </pre>
   */
  private routerLocationStateMap = new Map<string, HistoryState>();

  constructor() {
  }

  /**
   * 页面跳转
   * @param hash  页面路径
   * @param state 页面的状态值
   */
  public push(hash: string, state: HistoryState = {}): void {
    const path = RouterHistory.getHash(hash);
    if (!path) return;
    this.routerLocationStateMap.set(path, state);
    window.location.hash = `#${path}`;
  }

  /**
   * 替换页面状态值
   * @param hash  页面路径
   * @param state 页面的状态值
   */
  public replace(hash: string, state: HistoryState = {}): void {
    const path = RouterHistory.getHash(hash);
    if (!path) return;
    const oldState = this.routerLocationStateMap.get(path);
    if (!oldState) return;
    this.routerLocationStateMap.set(path, state);
  }

  /**
   * 获取页面状态
   * @param hash 页面路径
   */
  public getLocationState(hash: string): HistoryState {
    const path = RouterHistory.getHash(hash);
    if (!path) return;
    return this.routerLocationStateMap.get(path) ?? {};
  }
}

/** 路由跳转工具 */
const routerHistory = new RouterHistory();

/**
 *
 * @param routerConfigs
 */
const routerToRuntime = (routerConfigs: LayoutConfig[]): LayoutConfig[] => {
  if (!routerConfigs || routerConfigs.length <= 0) return routerConfigs;



  return routerConfigs;
}


function aa(routerConfigs: LayoutConfig[]): LayoutConfig {
  return routerConfigs[0];
}


export { routerHistory, routerToRuntime, aa };
