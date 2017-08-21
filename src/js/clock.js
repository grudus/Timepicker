import ClockHeader from "./clockHeader";
import ClockFace from "./face/clockFace";
import Config, {DOM} from "./meta/config";
import formatTime from "./timeFormatter";

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
            time.formatted = () => formatTime(time);
            this.options.onSubmit(time);
            Clock.dispose();
        };

        this.cancelButton = document.getElementById(DOM.cancelId);
        this.cancelButton.onclick = () => {
            this.options.onCancel();
            Clock.dispose();
        };
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

    static dispose() {
        document.body.removeChild(document.getElementById(Config.clockId));
    }
}