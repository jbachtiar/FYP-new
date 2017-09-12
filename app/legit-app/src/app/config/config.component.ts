import { devConfig } from './dev';
import { stagConfig } from './staging';
import { prodConfig } from './prod';

// set config to the configurations of the appropriate environment
let config = devConfig;

//change environment
let env = 'development'

if (env === 'production') {
  config = prodConfig;
  console.log('Running with PRODUCTION configurations!');
} else if (env === 'staging') {
  config = stagConfig;
  console.log('Running with STAGING configurations!');
} else {
  console.log('Running with DEV configurations');
}

export const CONFIG = config;
