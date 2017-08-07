import ClockHeader from "./clockHeader";
import ClockFace from "./clockFace";

export default class Clock {

    constructor(options) {
        this.options = options;

        this.initView();
        this.initTime();

        this.header = new ClockHeader({
            time: this.time,
            onHourClicked: this.toggleToHours,
            onMinutesClicked: this.toggleToHours
        });
        this.clockFace = new ClockFace(this.time);
    }

    initView() {
        this.submitButton = document.getElementsByClassName("g-submit")["0"];
        this.submitButton.onclick = () => {
            this.options.onSubmit(this.time);
            this.options.onClose();
        };

        this.cancelButton = document.getElementsByClassName("g-cancel")["0"];
        this.cancelButton.onclick = () => this.options.onClose();
    }

    initTime() {
        const date = new Date();
        this.time = {hours: date.getHours(), minutes: date.getMinutes()};
    }

    toggleToHours() {

    }

    toggleToMinutes() {

    }
}