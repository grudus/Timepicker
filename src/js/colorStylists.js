export default class ColorStylist {
    constructor(options) {
        document.getElementsByClassName("g-clock-wrapper")[0].style.background = options.wrapperBackground;
        document.getElementsByClassName("g-buttons")[0].style.background = options.footerBackground;
        document.getElementsByClassName("g-submit")[0].style.color = options.submitColor;
        document.getElementsByClassName("g-cancel")[0].style.color = options.cancelColor;
        document.getElementsByClassName("g-clock")[0].style.background = options.clockBackground;
        document.getElementsByClassName("g-hand-of-a-clock")[0].style.background = options.handColor;
        document.getElementsByClassName("g-middle-dot")[0].style.background = options.handColor;

        const outerItems = document.getElementsByClassName("g-clock-item");
        for (const outer of outerItems)
            outer.style.color = options.clockItemColor;

        const innerItems = document.getElementsByClassName("g-clock-inner");
        for (const inner of innerItems)
            inner.style.color = options.clockItemInnerColor;

        const dots = document.getElementsByClassName("g-clock-outer");
        for (const dot of dots) {
            //TODO check for changing only border color
            dot.style.border = `18px solid ${options.handColor}`;
        }

    }
}