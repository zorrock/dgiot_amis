#!/usr/bin/env node
import { settings } from '../../../build/config';

const { version } = require('../../../package.json');
const shell = require('shelljs');
const path = require('path');

console.log(path.resolve(settings.rootPath, './src'));

/**
 * @description shell 脚本打tag 然后通过github action 自动发布
 */
function release() {
    shell.exec(`git tag v${version}`);
    shell.exec(`git push origin v${version}`);
    shell.exec('exit');
}

release();
