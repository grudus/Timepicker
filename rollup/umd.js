import nodeResolve from "rollup-plugin-node-resolve";
import convertCJS from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

const packageInfo = require("../package.json");

export default {
    entry: "src/js/index.js",
    format: "umd",
    moduleName: "Timepicker",
    sourceMap: true,
    plugins: [
        nodeResolve({
            jsnext: true,
            main: false
        }),
        convertCJS(),
        babel(),
    ],
    dest: `dist/${packageInfo.name}.umd.js`
};