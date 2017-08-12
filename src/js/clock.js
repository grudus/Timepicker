import ClockHeader from "./clockHeader";
import ClockFace from "./face/clockFace";
import Config, {css} from "./meta/config";

export default class Clock {

    constructor(options) {
        this.options = options;

        this.initView();
        this.initTime();
        this.initElements();
    }

    initView() {
        this.submitButton = document.getElementsByClassName(css.submit)[0];
        this.submitButton.onclick = () => {
            this.options.onSubmit(this.time);
            this.options.onClose();
        };

        this.cancelButton = document.getElementsByClassName(css.cancel)[0];
        this.cancelButton.onclick = () => this.options.onClose();
    }

    initTime() {
        const date = new Date();
        this.time = {hours: date.getHours(), minutes: date.getMinutes()};
    }

    initElements() {
        this.header = new ClockHeader({
            options: this.options,
            time: this.time,
            onHourClicked: () => this.toggleToHours(),
            onMinutesClicked: () => this.toggleToMinutes()
        });
        this.clockFace = new ClockFace(this.options, this.time, (time, type) => this.onTimeUpdate(time, type));
    }

    onStart() {
        this.clockFace.onStart();
    }

    toggleToHours() {
        this.clockFace.toggleToHours();
    }

    toggleToMinutes() {
        this.clockFace.toggleToMinutes();
    }

    onTimeUpdate(time, type) {
        this.time = time;
        this.header.time = time;
        this.header.updateDisplayedTime();
        if (type === Config.FaceType.MINUTES)
            this.header.toggleActiveToMinutes();

    }
}