import path from "path";
import { Compiler } from "webpack";

const fs = require('fs');
const glob = require('glob');
const fsExtra = require('fs-extra');

const PLUGIN_NAME = 'CopyDistFilesPlugin';

interface ObjectPattern {
  from: string;
  to?: string;
  globOptions?: object;
  filter?: (resourcePath: string) => boolean;
  transformPath?: (targetPath: string, absolutePath: string) => string | Promise<string>;
}

interface PluginOptions {
  patterns: ObjectPattern[];
}

class CopyDistFiles {
  protected config: PluginOptions;

  constructor(options: PluginOptions) {
    this.config = Object.assign({}, options);
  }

  public apply(compiler: Compiler): any {
    compiler.hooks.afterEmit.tapPromise(PLUGIN_NAME, this.copyFile);
  }

  protected copyFile = async () => {
    const { patterns } = this.config;
    if (!patterns) return;
    for (let pattern of patterns) {
      // console.log("pattern -> ", pattern);
      const { from, to = "./", globOptions = {}, filter, transformPath } = pattern;
      await glob(from, globOptions, async (err: Error | null, files: string[]) => {
        // console.log("files -> ", files);
        if (err) console.error("复制文件失败", err);
        if (!files || files.length <= 0) return;
        for (let file of files) {
          const stat = fs.statSync(file);
          if (stat.isDirectory()) return;
          // 文件名
          const fileName = path.basename(file)
          // 过滤
          if (filter instanceof Function) {
            if (filter(file)) return
          }
          // 文件全路径
          let toPath = path.join(process.cwd(), to, fileName);
          if (transformPath instanceof Function) {
            toPath = await transformPath(toPath, path.join(process.cwd(), file));
          }
          await fsExtra.ensureDir(path.join(toPath, "../"));
          await fsExtra.copyFile(file, path.join(process.cwd(), toPath));
          console.log("复制文件: ", file, " -> ", toPath);
        }
      })
    }
    // console.log("config -> ", this.config);
  }
}

export { CopyDistFiles };
