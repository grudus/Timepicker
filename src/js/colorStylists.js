import {css, DOM} from "./meta/config";

export default class ColorStylist {
    constructor(options) {
        document.getElementById(DOM.headerId).style.background = options.headerBackground;
        document.getElementById(DOM.headerId).style.color = options.headerColor;

        document.getElementById(DOM.wrapperId).style.background = options.wrapperBackground;
        document.getElementById(DOM.clockId).style.background = options.clockBackground;
        document.getElementById(DOM.handId).style.background = options.handColor;
        document.getElementById(DOM.dotId).style.background = options.handColor;
        document.getElementById(DOM.buttonsId).style.background = options.footerBackground;
        document.getElementById(DOM.submitId).style.color = options.submitColor;
        document.getElementById(DOM.cancelId).style.color = options.cancelColor;

        ColorStylist.changeColor(css.clockItem, options.clockItemColor);
        ColorStylist.changeColor(css.inner, options.clockItemInnerColor);
        ColorStylist.changeColor(css.outer, options.handColor, "borderColor");

    }

    static changeColor(className, color, property = "color") {
        const items = document.getElementsByClassName(className);
        for (const item of items)
            item.style[property] = color;
    }
}