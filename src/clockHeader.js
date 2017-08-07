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
            this.toggleActive(this.headerMinutes, this.headerHours);
            this.onHourClicked();
        };

        this.headerMinutes = document.getElementsByClassName("g-minute")["0"];
        this.headerMinutes.onclick = () => {
            this.toggleActive(this.headerHours, this.headerMinutes);
            this.onMinutesClicked();
        };

        this.updateDisplayedTime();
    }

    toggleActive(objectToRemoveClass, objectToAddClass) {
        objectToRemoveClass.classList.remove("g-active");
        objectToAddClass.classList.add("g-active");
    }

    updateDisplayedTime() {
        this.doUpdateDisplayedTime(this.headerHours, this.time.hours);
        this.doUpdateDisplayedTime(this.headerMinutes, this.time.minutes);
    }

    doUpdateDisplayedTime(node, value) {
        if (value < 10)
            node.innerText = "0" + value;
        else node.innerText = value;
    }
}