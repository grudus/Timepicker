import Utils from "./utils";

export default class ClockFaceCreator {

    constructor(clockElem, innerClockElem) {
        this.clockElem = clockElem;
        this.innerClockElem = innerClockElem;
        this.size = {};
        this.middle = {};
    }

    create(clockItems, innerClockItems, outerClockItems, face) {
        ClockFaceCreator.doCreate(clockItems, this.clockElem, span => span.classList.add("g-clock-item"));
        ClockFaceCreator.doCreate(innerClockItems, this.innerClockElem, (span, i) => {
            span.classList.add("g-clock-item", "g-clock-inner");
            span.innerText = face.displayedInner[i];
        });

        for (let i = 0; i < 60; i++) {
            const span = document.createElement("span");
            span.classList.add("g-clock-outer");
            outerClockItems.push(span);
            this.clockElem.appendChild(span);
        }
    }

    static doCreate(clockItems, clockElem, fun) {
        for (let i = 0; i < 12; i++) {
            const span = document.createElement("span");
            fun(span, i);
            clockItems.push(span);
            clockElem.appendChild(span);
        }
    }

    calculateSize(clockItems, innerClockItems, outerClockItems) {
        this.size.width = this.clockElem.offsetWidth;
        this.size.height = this.clockElem.offsetHeight;
        this.middle.x = this.size.width / 2;
        this.middle.y = this.size.height / 2;
        this.itemsRadius = this.size.width / 2 - 20;

        const innerWidth = this.innerClockElem.offsetWidth;
        const innerHeight = this.innerClockElem.offsetHeight;
        const middleX = innerWidth / 2;
        const middleY = innerHeight / 2;

        ClockFaceCreator.doCalculateSize(this.middle.x, this.middle.y, this.itemsRadius, clockItems);
        ClockFaceCreator.doCalculateSize(middleX, middleY, this.itemsRadius - 40, innerClockItems);
        ClockFaceCreator.doCalculateSize(this.middle.x, this.middle.y, this.itemsRadius, outerClockItems);
    }

    static doCalculateSize(middleX, middleY, radius, items) {
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
}