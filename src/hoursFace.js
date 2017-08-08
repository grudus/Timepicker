import Config from "./config";

export default class HoursFace {

    constructor(items, initialHours, updateHours) {
        this.displayed = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
        this.displayedInner = ["00", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
        this.type = Config.FaceType.MINUTES;
        this.selected = undefined;

        this.items = items;
        this.hours = initialHours;
        this.updateHours = updateHours;
    }

    onEnter() {
        this.items.innerClockElem.style.display = "block";
        const isInnerClock = this.hours < 13 && this.hours !== 0;
        const hoursIndex = this.hours % 12;
        this.selected = isInnerClock ? this.items.clockItems[hoursIndex] : this.items.innerClockItems[hoursIndex];
        this.selected.classList.add("g-selected");

        this.updateHours(this.hours, hoursIndex * 30, isInnerClock ? this.items.radius : this.items.radius - 50);
    }

    onLeave() {
        this.items.innerClockElem.style.display = "none";
        if (this.selected) {
            this.selected.classList.remove("g-selected");
            this.selected = undefined;
        }
    }

    selectTime(angle, elem) {
        if (this.selected)
            this.selected.classList.remove("g-selected");

        const index = Math.round(angle / 30) % 12;
        this.selected = (elem === this.items.innerClockElem
            ? this.items.innerClockItems
            : this.items.clockItems)[index];

        this.selected.classList.add("g-selected");
        this.hours = parseInt(this.selected.innerText);
        const selectedAngle = Math.round(angle / 30) * 30;

        this.updateHours(this.hours, selectedAngle,
            elem === this.items.innerClockElem ? this.items.radius - 50 : this.items.radius);
    }
}