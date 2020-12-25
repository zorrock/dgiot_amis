// import 'font-awesome/css/font-awesome.css';
// import 'amis/lib/themes/default.css';
// import 'amis/lib/themes/cxd.css';
import '@/assets/css/reset.css';
import 'rc-tabs/assets/index.css';
import 'simplebar/src/simplebar.css';
// import 'antd/dist/antd.css';
// import 'antd/dist/antd.dark.css';
// import 'antd/dist/antd.compact.css';
import { getStore } from "@/utils/store";
import { logger } from './utils/logger';

const currentUser = getStore<UserInfo>("currentUser");
if (currentUser) {
  window.currentUser = currentUser;
}
const log = logger.getLogger("src/global.tsx");
log.info("global.tsx加载完成")
