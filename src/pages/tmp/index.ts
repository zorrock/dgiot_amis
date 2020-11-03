import lodash from 'lodash';
import style from './index.less';

lodash.forEach([1, 2, 3], (item: number) => {
  console.log("item -> ", item);
});

console.log("style --> ", style);
const demo2 = function () {
  console.log("首页 - TS ");
};

demo2();
