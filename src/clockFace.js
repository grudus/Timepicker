import MinutesFace from "./minutesFace";
import HoursFace from "./hoursFace";
import Utils from "./utils";

export default class ClockFace {

    constructor(initialTime) {
        this.initialTime = initialTime;

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
            radius: this.itemsRadius,
            innerClockItems: this.innerClockItems,
            clockItems: this.clockItems,
            innerClockElem: this.innerClockElem
        }, initialTime.hours, (hours, angle, radius) => this.updateHours(hours, angle, radius));

        this.createClockFace();
        this.calculateClockFace();

        this.changeDisplayed(this.hoursFace.displayed);
        this.hoursFace.onEnter();
    }


    initViews() {
        this.clockElem = document.getElementsByClassName("g-clock")["0"];
        this.innerClockElem = document.getElementsByClassName("g-clock g-clock-inner")["0"];
        this.handOfAClock = document.getElementsByClassName("g-hand-of-a-clock")["0"];
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
        console.log(`Update to minutes ${minutes} and angle ${angle}`);
        this.calculateHandOfTheClock(angle, this.itemsRadius);
    }

    updateHours(hours, angle, radius) {
        console.log(`Update to hours ${hours} and angle ${angle}`);
        this.calculateHandOfTheClock(angle, radius);
    }

    calculateHandOfTheClock(angle, size = this.itemsRadius) {
        this.handOfAClock.style.transform = `rotate(${angle - 90}deg)`;
        this.handOfAClock.style.width = size + "px";
    }

    toggleToHours() {
        this.onEachClockElement(c => c.classList.remove("g-selected"));
        this.minutesFace.onLeave();
        this.hoursFace.onEnter();
        this.changeDisplayed(this.hoursFace.displayed);
    }

    toggleToMinutes() {
        this.onEachClockElement(c => c.classList.remove("g-selected"));
        this.hoursFace.onLeave();
        this.minutesFace.onEnter();
        this.changeDisplayed(this.minutesFace.displayed);

    }
}