import Config, {css} from "../meta/config";

export default class MinutesFace {

    constructor(items, initialMinutes, updateMinutes) {
        this.displayed = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
        this.options = items.options;
        this.type = Config.FaceType.MINUTES;
        this.selected = undefined;
        this.items = items;
        this.minutes = initialMinutes;
        this.updateMinutes = updateMinutes;
    }

    onEnter() {
        this.selected = this.findSelected(this.minutes);
        this.colorSelected();
        this.updateMinutes(this.minutes, this.minutes * 6);
    }

    onLeave() {
        if (this.selected) {
            this.removeSelected();
            this.selected = undefined;
        }
    }

    selectTime(angle) {
        if (this.selected)
            this.removeSelected();

        const minute = Math.round(angle / 6) % 60;
        this.selected = this.findSelected(minute);
        this.colorSelected();
        this.minutes = minute;
        this.updateMinutes(this.minutes, angle);
    }

    findSelected(minute) {
        return (minute % 5 === 0) ? this.items.clockItems[minute / 5] : this.items.outerClockItems[minute];
    }

    colorSelected() {
        if (this.isOuter()) {
            this.selected.classList.add(css.selected);
            return;
        }
        this.selected.style.background = this.options.handColor;
        this.selected.style.color = "whitesmoke";
    }

    removeSelected() {
        if (this.isOuter()) {
            this.selected.classList.remove(css.selected);
            return;
        }
        this.selected.style.background = "transparent";
        this.selected.style.color = this.options.clockItemColor;
    }

    isOuter() {
        return this.items.outerClockItems.indexOf(this.selected) > -1;
    }
}