import Config from "./config";

export default class MinutesFace {

    constructor(items, initialMinutes, updateMinutes) {
        this.displayed = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
        this.type = Config.FaceType.MINUTES;
        this.selected = undefined;
        this.items = items;
        this.minutes = initialMinutes;
        this.updateMinutes = updateMinutes;
    }

    onEnter() {
        this.selected = this.findSelected(this.minutes);
        this.selected.classList.add("g-selected");
        this.updateMinutes(this.minutes, this.minutes * 6);
    }

    onLeave() {
        if (this.selected) {
            this.selected.classList.remove("g-selected");
            this.selected = undefined;
        }
    }

    selectTime(angle) {
        if (this.selected)
            this.selected.classList.remove("g-selected");

        const minute = Math.round(angle / 6) % 60;
        this.selected = this.findSelected(minute);
        this.selected.classList.add("g-selected");
        this.minutes = minute;
        this.updateMinutes(this.minutes, angle);
    }

    findSelected(minute) {
        return (minute % 5 === 0) ? this.items.clockItems[minute / 5] : this.items.outerClockItems[minute];
    }
}