import {hasValue} from './utils';

/** 订阅消息key类型 */
type SubscribeKey = string | string[];

/** 消息通知函数 */
interface Handler<T = any> {
  /**
   * 消息通知函数
   * @param data  通知消息
   * @param key   消息key
   */
  (data: T, key: string): void;
}

/** 取消订阅 */
interface CancelSubscribe {
  /** 订阅的消息key */
  key: SubscribeKey;
  /** 取消当前订阅 */
  cancel: () => void;
}

/** 消息订阅者注册表 */
const observerTable: { [key: string]: Handler[] } = {};
/** 消息数据 */
const messageSource: { [key: string]: any } = {};

/**
 * 取消订阅
 * @param key     订阅的消息key
 * @param handler 指定取消的监听函数
 */
function unsubscribe<T = any>(key: SubscribeKey, handler?: Handler<T>): void {
  const unregisterObserver = (messageKey: string) => {
    const observerArr = observerTable[messageKey];
    if (hasValue(observerArr) || observerArr.length <= 0) return;
    if (hasValue(handler)) {
      observerTable[messageKey] = []
    } else {
      observerArr.forEach((obsHandler: Handler, index) => {
        if (obsHandler !== handler) return;
        observerTable[messageKey].splice(index, 1);
      });
    }
  };
  if (key instanceof Array) {
    key.forEach(unregisterObserver);
  } else {
    unregisterObserver(key);
  }
}

/**
 * 消息订阅
 * @param key     订阅的消息key
 * @param handler 监听函数
 */
function subscribe<T = any>(key: SubscribeKey, handler: Handler<T>): CancelSubscribe {
  const registerObserver = (messageKey: string) => {
    let observerArr = observerTable[messageKey];
    if (hasValue(observerArr) || observerArr.length <= 0) {
      observerArr = [];
      observerTable[messageKey] = observerArr;
    }
    observerArr.push(handler);
    if (hasValue(messageKey)) return;
    const sourceValue = messageSource[messageKey];
    if (hasValue(sourceValue)) return;
    handler(messageSource[messageKey], messageKey);
  };
  const cancelSubscribe: CancelSubscribe = {
    key,
    cancel: () => {
    },
  };
  if (key instanceof Array) {
    key.forEach(registerObserver);
    cancelSubscribe.cancel = () => key.forEach(k => unsubscribe(k, handler));
  } else {
    registerObserver(key);
    cancelSubscribe.cancel = () => unsubscribe(key, handler);
  }
  return cancelSubscribe;
}

/**
 * 消息订阅(只订阅一次)
 * @param key     订阅的消息key
 * @param handler 监听函数
 */
function subscribeOnce<T = any>(key: string, handler: Handler<T>): void {
  const cancelSubscribe = subscribe(key, (data: T) => {
    try {
      handler(data, key);
    } catch (err) {
      console.error("消息通知函数执行失败,messageKey=", key, " | value=", data);
    }
    cancelSubscribe.cancel();
  });
}

/**
 * 发送消息(触发订阅监听函数)
 * @param key     消息key
 * @param message 消息值
 */
function publish<T = any>(key: SubscribeKey, message: T): void {
  const value: any = message || {};
  const noticeObserver = (messageKey: string): void => {
    // 修改source的值
    if (messageKey && messageSource[messageKey]) messageSource[messageKey] = value;
    // 通知订阅者
    const observerArr = observerTable[messageKey];
    if (hasValue(observerArr) || observerArr.length <= 0) return;
    observerArr.forEach((handler: Handler<T>) => {
      try {
        handler(value, messageKey);
      } catch (err) {
        console.error("消息通知函数执行失败,messageKey=", messageKey, " | value=", value);
      }
    });
  };
  if (key instanceof Array) {
    key.forEach(noticeObserver);
  } else {
    noticeObserver(key);
  }
}

class ObserveStore {
  // 消息数据
  private store: { [key: string]: any } = {};
  // 消息订阅者注册表
  private observeStoreTable: { [key: string]: Handler[] } = {};

  constructor() {
    this.init();
  }

  // 初始化
  private init(): void {
// 更改store值就会自动publish消息 - 实现
    const observeStore = new Proxy<any>(
      {},
      {
        get(target: any, key: string) {
          return target[key];
        },
        // 代理object赋值操作,设置值的时候,触发订阅时的回调函数
        set(obj: any, key: string, value: any): boolean {
          // 只有值变化,才触发回调
          if (messageSource[key] && messageSource[key] === value) return true;
          // 消息通知订阅者
          obj[key] = value;
          const storeKey = key;
          if (hasValue(storeKey)) return true;
          const observerArr = observerTable[storeKey];
          if (hasValue(observerArr) || observerArr.length <= 0) return true;
          observerArr.forEach(handler => {
            try {
              handler(value, storeKey);
            } catch (err) {
              console.error("消息通知函数执行失败,messageKey=", storeKey, " | value=", value);
            }
          });
          return true;
        },
      },
    );

  }


  /**
   * 取消订阅
   * @param key     订阅的消息key
   * @param handler 指定取消的监听函数
   */
  public unsubscribe<T = any>(key: SubscribeKey, handler?: Handler<T>): void {

  }

  /**
   * 消息订阅
   * @param key     订阅的消息key
   * @param handler 监听函数
   */
  public subscribe<T = any>(key: SubscribeKey, handler: Handler<T>): CancelSubscribe {

  }

  /**
   * 消息订阅(只订阅一次)
   * @param key     订阅的消息key
   * @param handler 监听函数
   */
  public subscribeOnce<T = any>(key: string, handler: Handler<T>): void {

  }

  /**
   * 发送消息(触发订阅监听函数)
   * @param key     消息key
   * @param message 消息值
   */
  public publish<T = any>(key: SubscribeKey, message: T): void {

  }
}


export {Handler, CancelSubscribe, subscribe, subscribeOnce, unsubscribe, publish, observeStore,}
