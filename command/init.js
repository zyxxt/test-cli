/**
 * Created by zyt on 2016/11/25.
 */

'use strict';
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const UnderscoreTemplate = require('underscore.template');


module.exports = function (templateName) {
    co(function *() {
        let option;
        while (true) {
            option = {};
            option.projectName = yield prompt('Project name: ');
            option.version = yield prompt('Project version: ');

            console.log('options:', JSON.stringify(option, true, 4));
            let sure = yield prompt('sure(y/n)');
            if (sure !== 'n') {
                break;
            }
        }

        let filePath = path.join(__dirname, '../template', templateName, 'package.json');
        console.log(filePath);
        let html = fs.readFileSync(filePath).toString();
        html = UnderscoreTemplate(html, option);

        fs.writeFileSync(path.join(process.cwd(), 'abc.json'), html);

        console.log(chalk.green('Generation completed!'));
        process.exit();
    });
};
