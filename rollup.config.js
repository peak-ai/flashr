import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const dependencies = [...Object.keys(pkg.dependencies || {})];
const umdGlobals = {};
for (const dep of dependencies) {
  umdGlobals[dep] = dep;
}

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/flashr.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/flashr.cjs.min.js',
      format: 'cjs',
      plugins: [terser()],
    },
    {
      file: 'dist/flashr.esm.js',
      format: 'es',
    },
    {
      file: 'dist/flashr.esm.min.js',
      format: 'es',
      plugins: [terser()],
    },
    {
      file: 'dist/flashr.umd.js',
      name: 'Flashr',
      format: 'umd',
      globals: umdGlobals,
    },
    {
      file: 'dist/flashr.umd.min.js',
      name: 'Flashr',
      format: 'umd',
      globals: umdGlobals,
      plugins: [terser()],
    },
  ],
  external: dependencies,
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfig: 'tsconfig.json',
      tsconfigOverride: { compilerOptions: { declaration: false } },
    }),
  ],
};
