import { Plugin } from '../types';
import { RandomAPI, PrivateRandomAPI, RandomState } from './random/random';
declare const RandomPlugin: Plugin<RandomAPI & PrivateRandomAPI, RandomState>;
export default RandomPlugin;
