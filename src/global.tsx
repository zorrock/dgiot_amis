// import 'font-awesome/css/font-awesome.css';
// import 'amis/lib/themes/default.css';
// import 'amis/lib/themes/cxd.css';

import { logger } from './utils/logger';

const log = logger.getLogger(__filename);
log.log("----> ", isProdEnv);
log.info("----> ", isProdEnv);
log.warn("----> ", isProdEnv);
log.error("----> ", isProdEnv);
