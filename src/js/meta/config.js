const clockId = "grudus-clock";

const clockConfig = {
    onSubmit: (time) => console.log(`Time: ${time.hours}:${time.minutes}`),
    onClose: () => document.body.removeChild(document.getElementById(clockId)),
    headerBackground: "#1976D2",
    headerColor: "#c7d6e1",
    headerSelected: "#ffffff",
    wrapperBackground: "#f0fff0",
    footerBackground: "#f0fff0",
    submitColor: "#1976D2",
    cancelColor: "#1976D2",
    clockBackground: "#CFD8DC",
    clockItemColor: "#212121",
    clockItemInnerColor: "#212121",
    handColor: "#1976D2"
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