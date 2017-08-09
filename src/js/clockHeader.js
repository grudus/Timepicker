export default class ClockHeader {

    constructor(config) {
        this.time = config.time;
        this.onHourClicked = config.onHourClicked;
        this.onMinutesClicked = config.onMinutesClicked;

        this.initView();
    }

    initView() {
        this.headerHours = document.getElementsByClassName("g-hour")["0"];
        this.headerHours.onclick = () => {
            this.toggleActiveToHours();
            this.onHourClicked();
        };

        this.headerMinutes = document.getElementsByClassName("g-minute")["0"];
        this.headerMinutes.onclick = () => {
            this.toggleActiveToMinutes();
            this.onMinutesClicked();
        };

        this.updateDisplayedTime();
    }

    toggleActiveToMinutes() {
        ClockHeader.toggleActive(this.headerHours, this.headerMinutes);
    }

    toggleActiveToHours() {
        ClockHeader.toggleActive(this.headerMinutes, this.headerHours);
    }

    static toggleActive(objectToRemoveClass, objectToAddClass) {
        objectToRemoveClass.classList.remove("g-active");
        objectToAddClass.classList.add("g-active");
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