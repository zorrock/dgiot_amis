const fs = require('fs');
const fsExtra = require('fs-extra');

// const extArray = [".html"];
// fsExtra.rmdirSync("./server/dist", {recursive: true});
// fsExtra.copySync(
//   "./dist",
//   "./server/dist",
//   {
//     overwrite: true,
//     recursive: false,
//     filter: (src, dest) => {
//       console.log("src -> ", src);
//       const stat = fs.statSync(src);
//       if (stat.isDirectory()) return true;
//       const exists = extArray.filter(ext => src.endsWith(ext));
//       return exists && exists.length > 0;
//     }
//   }
// );

const aa = fsExtra.readdirSync("./dist", {withFileTypes: true});

console.log("aa -> ", aa);
