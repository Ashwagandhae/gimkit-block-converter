import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import sveltePreprocess from 'svelte-preprocess';
import styles from 'rollup-plugin-styles';

import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

export default {
  input: 'src/index.ts',
  name: 'BlockConverter',
  description: 'Converts between JavaScript, JSON and Gimkit Blocks.',
  author: 'Ashwagandhae',
  version: pkg.version,
  reloadRequired: true,
  downloadUrl:
    'https://raw.githubusercontent.com/Ashwagandhae/gimkit-block-converter/main/build/BlockConverter.js',
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      sourceMap: false,
    }),
    styles(),
  ],
};
