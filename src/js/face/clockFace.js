import MinutesFace from "./minutesFace";
import HoursFace from "./hoursFace";
import Utils from "../meta/utils";
import Config, {css, DOM} from "../meta/config";
import ClockFaceCreator from "./clockFaceCreator";

export default class ClockFace {

    constructor(options, initialTime, onTimeUpdate) {
        this.options = options;
        this.time = initialTime;
        this.onTimeUpdate = onTimeUpdate;
        this.isMouseDown = false;
        this.clockItems = [];
        this.innerClockItems = [];
        this.outerClockItems = [];
        this.size = {};
        this.middle = {};

        this.initViews();
        this.initTimeFaces(initialTime);
        this.createFace();

        this.hoursFace.items.radius = this.itemsRadius;

        this.currentFace = this.hoursFace;
        this.changeDisplayed(this.currentFace.displayed);
    }

    initViews() {
        this.clockElem = document.getElementById(DOM.clockId);
        this.innerClockElem = document.getElementById(DOM.innerId);
        this.handOfAClock = document.getElementById(DOM.handId);

        this.clockElem.onmousedown = () => this.isMouseDown = true;
        this.clockElem.onmouseup = () => {this.isMouseDown = false;
            this.toggleToMinutes();
        };

        this.handOfAClock.onmouseup = () => event.stopPropagation();
        this.handOfAClock.onmousemove = () => event.stopPropagation();
        this.handOfAClock.onclick = () => event.stopPropagation();

        this.clockElem.onmousemove = () => this.selectTime(event, false, this.clockElem);
        this.clockElem.onclick = () => this.selectTime(event, true, this.clockElem);

        this.innerClockElem.onmousemove = () => this.selectTime(event, false, this.innerClockElem);
        this.innerClockElem.onclick = () => this.selectTime(event, true, this.innerClockElem);
    }

    initTimeFaces(initialTime) {
        this.minutesFace = new MinutesFace({
            options: this.options,
            clockItems: this.clockItems,
            outerClockItems: this.outerClockItems
        }, initialTime.minutes, (minutes, angle) => this.updateMinutes(minutes, angle));

        this.hoursFace = new HoursFace({
            options: this.options,
            innerClockItems: this.innerClockItems,
            clockItems: this.clockItems,
            innerClockElem: this.innerClockElem
        }, initialTime.hours, (hours, angle, radius) => this.updateHours(hours, angle, radius));
    }

    onStart() {
        this.currentFace.onEnter();
    }

    createFace() {
        const clockFaceCreator = new ClockFaceCreator(this.clockElem, this.innerClockElem);
        clockFaceCreator.create(this.clockItems, this.innerClockItems, this.outerClockItems, this.hoursFace);
        clockFaceCreator.calculateSize(this.clockItems, this.innerClockItems, this.outerClockItems);

        this.size = clockFaceCreator.size;
        this.middle = clockFaceCreator.middle;
        this.itemsRadius = clockFaceCreator.itemsRadius;
    }

    selectTime(event, isMouseDown, elem) {
        if (!(isMouseDown || this.isMouseDown))
            return;
        const mouse = Utils.findMousePosition(event, this.clockElem);
        const x = mouse.x - this.middle.x;
        const y = this.middle.y - mouse.y;
        let angle = 90 - Utils.toDegrees(Math.atan(y / x));
        if (x < 0) angle += 180;

        this.currentFace.selectTime(angle, elem);
        event.stopPropagation();
    }

    changeDisplayed(array) {
        for (let i = 0; i < this.clockItems.length; i++)
            this.clockItems[i].innerText = array[i];
    }

    onEachClockElement(fun) {
        [].forEach.call(this.clockItems, c => fun(c));
    }

    updateMinutes(minutes, angle) {
        this.time.minutes = minutes;
        this.calculateHandOfTheClock(angle, this.itemsRadius);
        this.onTimeUpdate(this.time, Config.FaceType.MINUTES);
    }

    updateHours(hours, angle, radius) {
        this.time.hours = hours;
        this.calculateHandOfTheClock(angle, radius);
        this.onTimeUpdate(this.time, Config.FaceType.HOURS);
    }

    calculateHandOfTheClock(angle, size = this.itemsRadius) {
        this.handOfAClock.style.transform = `rotate(${angle - 90}deg)`;
        this.handOfAClock.style.width = size + "px";
    }

    toggleToHours() {
        this.minutesFace.onLeave();
        this.toggleTime(this.hoursFace);
    }

    toggleToMinutes() {
        this.hoursFace.onLeave();
        this.toggleTime(this.minutesFace);
    }

    toggleTime(face) {
        if (this.currentFace !== face) {
            this.onEachClockElement(c => c.classList.add(css.fadeOut));
            this.handOfAClock.classList.add(css.fadeOut);
            Promise.delay(() => {
                this.onEachClockElement(c => c.classList.remove(css.fadeOut));
                this.handOfAClock.classList.remove(css.fadeOut);
                this.changeDisplayed(face.displayed);
                this.currentFace = face;
                this.onEachClockElement(c => this.removeSelected(c));
                face.onEnter();
            }, 300);
        }
    }

    removeSelected(c) {
        c.classList.remove(css.selected);
        c.style.background = "transparent";
        c.style.color = this.options.clockItemColor;
    }
}