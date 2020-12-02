// import 'font-awesome/css/font-awesome.css';
// import 'amis/lib/themes/default.css';
// import 'amis/lib/themes/cxd.css';
import '@/assets/css/reset.css';
import {logger} from './utils/logger';
import {observeStore} from './utils/message-observe';

const log = logger.getLogger(__filename);
// log.log("----> ", isProdEnv);
// log.info("----> ", isProdEnv);
// log.warn("----> ", isProdEnv);
// log.error("----> ", isProdEnv);

const r_1 = observeStore.subscribe("aaa", (data, key) => {
  log.info("#1 | key=", key, "| data=", data);
});

const r_2 = observeStore.subscribe(["aaa", "bbb", "ccc"], (data, key) => {
  log.info("#2 | key=", key, "| data=", data);
});

observeStore.publish("aaa", "a1111");
observeStore.publish("bbb", "b1111");
observeStore.publish("ccc", "c1111");
observeStore.publish("aaa", "a2222");
r_1.cancel();
r_2.cancel();

observeStore.publish("aaa", "a3333");
observeStore.unsubscribe("aaa");
observeStore.publish("aaa", "a4444");

observeStore.publish("bbb", "b3333");
observeStore.publish("ccc", "c3333");
observeStore.unsubscribe(["bbb", "ccc"]);

observeStore.publish("bbb", "b4444");
observeStore.publish("ccc", "c4444");

// r_2.cancel();

observeStore.publish("bbb", "b555");
observeStore.publish("ccc", "c555");
observeStore.publish("aaa", "a555");

log.info("------------------------------------------------------");
observeStore.subscribe(["aaa", "bbb", "ccc"], (data, key) => {
  log.info("#3 | key=", key, "| data=", data);
});

observeStore.publish("aaa", {a: 123, b: new Date(), c: true, d: "a123"});

observeStore.getStore().bbb = {a: 123456, b: new Date(), c: false, d: "a123456"};
observeStore.getStore().bbb = null;
observeStore.getStore().bbb = null;
observeStore.getStore().bbb = undefined;

observeStore.subscribeOnce("ddd", (data, key) => {
  log.info("#4 | key=", key, "| data=", data);
});

observeStore.publish("ddd", "d1");
observeStore.publish("ddd", "d2");

log.info("end -> ", observeStore.getStore());

