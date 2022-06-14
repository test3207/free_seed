import * as local from './local.json';
import * as defaultConfig from './default.json';

const config = Object.assign({}, defaultConfig, local);

export { config };