import nodeResolve from "rollup-plugin-node-resolve";
import convertCJS from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";

const packageInfo = require("../package.json");
const banner = `/*! ${packageInfo.name} | (c) 2017-${new Date().getFullYear()} 
    ${packageInfo.author} | ${packageInfo.license} license (see LICENSE) */`;


export default {
    entry: "src/js/index.js",
    format: "umd",
    moduleName: "Timepicker",
    sourceMap: true,
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        convertCJS(),
        babel(),
        uglify({
            output: {
                preamble: banner
            }
        })
    ],
    dest: `dist/${packageInfo.name}.es5.js`
};