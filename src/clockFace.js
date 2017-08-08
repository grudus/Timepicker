import MinutesFace from "./minutesFace";
import HoursFace from "./hoursFace";
import Utils from "./utils";
import Config from "./config";

export default class ClockFace {

    constructor(initialTime, onTimeUpdate) {
        this.time = initialTime;
        this.onTimeUpdate = onTimeUpdate;
        this.isMouseDown = false;
        this.clockItems = [];
        this.innerClockItems = [];
        this.outerClockItems = [];
        this.size = {};
        this.middle = {};

        this.initViews();

        this.minutesFace = new MinutesFace({
            clockItems: this.clockItems,
            outerClockItems: this.outerClockItems
        }, initialTime.minutes, (minutes, angle) => this.updateMinutes(minutes, angle));

        this.hoursFace = new HoursFace({
            innerClockItems: this.innerClockItems,
            clockItems: this.clockItems,
            innerClockElem: this.innerClockElem
        }, initialTime.hours, (hours, angle, radius) => this.updateHours(hours, angle, radius));

        this.createClockFace();
        this.calculateClockFace();
        this.hoursFace.items.radius = this.itemsRadius;

        this.currentFace = this.hoursFace;
        this.changeDisplayed(this.currentFace.displayed);
        this.currentFace.onEnter();
    }


    initViews() {
        this.clockElem = document.getElementsByClassName("g-clock")["0"];
        this.innerClockElem = document.getElementsByClassName("g-clock g-clock-inner")["0"];
        this.handOfAClock = document.getElementsByClassName("g-hand-of-a-clock")["0"];
        this.clockElem.onmousedown = () => this.isMouseDown = true;
        this.clockElem.onmouseup = () => {
            this.isMouseDown = false;
            this.toggleToMinutes();
        };
        this.clockElem.onmousemove = () => this.selectTime(event, false, this.clockElem);
        this.clockElem.onclick = () => this.selectTime(event, true, this.clockElem);

        this.innerClockElem.onmousemove = () => this.selectTime(event, false, this.innerClockElem);
        this.innerClockElem.onclick = () => this.selectTime(event, true, this.innerClockElem);
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

    createClockFace() {
        this.doCreate(this.clockItems, this.clockElem, span => span.classList.add("g-clock-item"));
        this.doCreate(this.innerClockItems, this.innerClockElem, (span, i) => {
            span.classList.add("g-clock-item", "g-clock-inner");
            span.innerText = this.hoursFace.displayedInner[i];
        });

        for (let i = 0; i < 60; i++) {
            const span = document.createElement("span");
            span.classList.add("g-clock-outer");
            this.outerClockItems.push(span);
            this.clockElem.appendChild(span);
        }
    }

    doCreate(clockItems, clockElem, fun) {
        for (let i = 0; i < 12; i++) {
            const span = document.createElement("span");
            fun(span, i);
            clockItems.push(span);
            clockElem.appendChild(span);
        }
    }

    calculateClockFace() {
        this.size.width = this.clockElem.offsetWidth;
        this.size.height = this.clockElem.offsetHeight;
        this.middle.x = this.size.width / 2;
        this.middle.y = this.size.height / 2;
        this.itemsRadius = this.size.width / 2 - 20;

        const innerWidth = this.innerClockElem.offsetWidth;
        const innerHeight = this.innerClockElem.offsetHeight;
        const middleX = innerWidth / 2;
        const middleY = innerHeight / 2;

        this.doCalculateClockFace(this.middle.x, this.middle.y, this.itemsRadius, this.clockItems);
        this.doCalculateClockFace(middleX, middleY, this.itemsRadius - 40, this.innerClockItems);
        this.doCalculateClockFace(this.middle.x, this.middle.y, this.itemsRadius, this.outerClockItems);
    }

    doCalculateClockFace(middleX, middleY, radius, items) {
        const angleQuantum = 360 / items.length;
        for (let i = 0; i < items.length; i++) {

            const angle = Utils.toRadians(i * angleQuantum);
            const item = items[i];
            const itemWidth = item.offsetWidth;
            const itemHeight = item.offsetHeight;

            item.style.left = ((middleX + Math.sin(angle) * radius) - itemWidth / 2) + "px";
            item.style.bottom = ((middleY + Math.cos(angle) * radius) - itemHeight / 2) + "px";
        }
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
            this.onEachClockElement(c => c.classList.add("g-fade-out"));
            this.handOfAClock.classList.add("g-fade-out");
            Promise.delay(() => {
                this.onEachClockElement(c => c.classList.remove("g-fade-out"));
                this.handOfAClock.classList.remove("g-fade-out");
                this.changeDisplayed(face.displayed);
                this.currentFace = face;
                this.onEachClockElement(c => c.classList.remove("g-selected"));
                face.onEnter();
            }, 300);
        }
    }
}