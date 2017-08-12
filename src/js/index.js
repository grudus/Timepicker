import clockHtml from "./meta/clockHtml";
import Config from "./meta/config";
import Clock from "./clock";
import ColorStylist from "./colorStylists";

function showPicker(config = {}) {
    const options = Object.assign({}, Config.clockConfig, config);
    const clockDiv = document.createElement("div");
    clockDiv.id = Config.clockId;
    clockDiv.innerHTML = clockHtml;
    document.body.appendChild(clockDiv);

    const clock = new Clock(options);
    new ColorStylist(options);
    clock.onStart();
}

export {showPicker};
