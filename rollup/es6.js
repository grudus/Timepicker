import nodeResolve from "rollup-plugin-node-resolve";
import convertCJS from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

const packageInfo = require("../package.json");
const banner = `/*! ${packageInfo.name} | (c) 2017-${new Date().getFullYear()}
 ${packageInfo.author} | ${packageInfo.license} license (see LICENSE) */`;

export default {
    entry: "src/js/index.js",
    format: "es",
    sourceMap: true,
    plugins: [
        nodeResolve({
            jsnext: true,
            main: false
        }),
        convertCJS(),
        babel()
    ],
    banner,
    dest: `dist/${packageInfo.name}.js`
};