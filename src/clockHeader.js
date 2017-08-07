export default class ClockHeader {

    constructor(config) {
        this.time = config.time;
        this.onHourClicked = config.onHourClicked;
        this.onMinutesClicked = config.onMinutesClicked;

        this.initView();
    }

    initView() {
        this.headerHours = document.getElementsByClassName("g-hour")["0"];
        this.headerHours.onclick = () => this.onHourClicked();

        this.headerMinutes = document.getElementsByClassName("g-minute")["0"];
        this.headerMinutes.onclick = () => this.onMinutesClicked();

        this.updateDisplayedTime();
    }

    updateDisplayedTime() {
        if (this.time.hours < 10)
            this.headerHours.innerText = "0" + this.time.hours;
        else this.headerHours.innerText = this.time.hours;

        if (this.time.minutes < 10)
            this.headerMinutes.innerText = "0" + this.time.minutes;
        else this.headerMinutes.innerText = this.time.minutes;
    }
}