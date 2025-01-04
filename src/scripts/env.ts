/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve } from 'path';

const env = process.env.ENV || 'dev';

let configUrl: string;

if (process.env.LAMBDA_TASK_ROOT && !process.env.IS_OFFLINE) {
    configUrl = resolve(process.env.LAMBDA_TASK_ROOT, `config/${env}.json`);
} else {
    configUrl = resolve(process.cwd(), `config/${env}.json`);
}

const config = require(configUrl);
export default config;
