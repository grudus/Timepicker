import nodeResolve from 'rollup-plugin-node-resolve';
import convertCJS from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import globals from 'rollup-plugin-node-globals';

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'Timepicker',
    sourceMap: true,
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        convertCJS(),
        babel({
            exclude: 'node_modules/**',
            presets: [
                ['es2015', {modules: false}]
            ]
        }),
        globals()
    ],
    dest: `dist/bundle.js`
};