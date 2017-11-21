import { devConfig } from './dev';
import { stagConfig } from './staging';
import { prodConfig } from './prod';

// set config to the configurations of the appropriate environment
let config = devConfig;

//change environment
let env = 'production'

if (env === 'production') {
  config = prodConfig;
} else if (env === 'staging') {
  config = stagConfig;

} else {

}

export const CONFIG = config;
