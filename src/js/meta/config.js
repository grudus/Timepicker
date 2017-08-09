const clockId = "grudus-clock";

const clockConfig = {
    onSubmit: (time) => console.log(`Time: ${time.hours}:${time.minutes}`),
    onClose: () => document.body.removeChild(document.getElementById(clockId))
};

const FaceType = {HOURS: "hours", MINUTES: "minutes"};
const css = {
    clock: "g-clock",
    inner: "g-clock-inner",
    outer: "g-clock-outer",
    item: "g-clock-item",
    hand: "g-hand-of-a-clock",
    fadeOut: "g-fade-out",
    selected: "g-selected",
    active: "g-active",
    submit: "g-submit",
    cancel: "g-cancel",
    hour: "g-hour",
    minute: "g-minute"
};

export default {clockId, clockConfig, FaceType};
export {css};