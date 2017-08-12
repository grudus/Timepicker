import ClockHeader from "./clockHeader";
import ClockFace from "./face/clockFace";
import Config, {DOM} from "./meta/config";

export default class Clock {

    constructor(options, time) {
        this.options = options;

        this.initView();
        this.time = time;
        this.initElements();
    }

    initView() {
        this.submitButton = document.getElementById(DOM.submitId);
        this.submitButton.onclick = () => {
            const time = this.time;
            time.formatted = function () {
                return (time.hours < 10 ? "0" + time.hours : time.hours)
                    + ":" + (time.minutes < 10 ? "0" + time.minutes : time.minutes);
            };
            this.options.onSubmit(time);
            this.options.onClose();
        };

        this.cancelButton = document.getElementById(DOM.cancelId);
        this.cancelButton.onclick = () => this.options.onClose();
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