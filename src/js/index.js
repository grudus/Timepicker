import clockHtml from "./meta/clockHtml";
import Config from "./meta/config";
import Clock from "./clock";
import styleColors from "./colorStylists";
import getTime from "./timeExtractor";
import formatTime from "./timeFormatter";

function showPicker(config = {}) {
    const options = Object.assign({}, Config.clockConfig, config);
    const time = getTime(options.time);

    const clockDiv = document.createElement("div");
    clockDiv.id = Config.clockId;
    clockDiv.innerHTML = clockHtml;
    document.body.appendChild(clockDiv);

    const clock = new Clock(options, time);
    styleColors(options);
    clock.onStart();
}

export default {
    showPicker: (config) => showPicker(config),
    format: (time) => formatTime(time)
};

