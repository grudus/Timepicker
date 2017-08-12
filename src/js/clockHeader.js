import {css} from "./meta/config";

export default class ClockHeader {

    constructor(config) {
        this.options = config.options;
        this.time = config.time;
        this.onHourClicked = config.onHourClicked;
        this.onMinutesClicked = config.onMinutesClicked;

        this.initView();
    }

    initView() {
        document.getElementsByClassName("g-head")[0].style.background = this.options.headerBackground;
        document.getElementsByClassName("g-head")[0].style.color = this.options.headerColor;
        this.headerHours = document.getElementsByClassName(css.hour)[0];
        this.headerHours.onclick = () => {
            this.toggleActiveToHours();
            this.onHourClicked();
        };

        this.headerMinutes = document.getElementsByClassName(css.minute)[0];
        this.headerMinutes.onclick = () => {
            this.toggleActiveToMinutes();
            this.onMinutesClicked();
        };

        this.updateDisplayedTime();
        this.toggleActiveToHours();
    }

    toggleActiveToMinutes() {
        this.toggleActive(this.headerHours, this.headerMinutes);
    }

    toggleActiveToHours() {
        this.toggleActive(this.headerMinutes, this.headerHours);
    }

    toggleActive(objectToRemoveClass, objectToAddClass) {
        objectToRemoveClass.style.color = this.options.headerColor;
        objectToAddClass.style.color = this.options.headerSelected;
    }

    updateDisplayedTime() {
        ClockHeader.doUpdateDisplayedTime(this.headerHours, this.time.hours);
        ClockHeader.doUpdateDisplayedTime(this.headerMinutes, this.time.minutes);
    }

    static doUpdateDisplayedTime(node, value) {
        if (value < 10)
            node.innerText = "0" + value;
        else node.innerText = value;
    }
}