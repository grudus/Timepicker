import clockHtml from "./meta/clockHtml";
import Config from "./meta/config";
import Clock from "./clock";
import styleColors from "./colorStylists";
import getTime from "./timeExtractor";


export default function showPicker(config = {}) {
    createDom();

    const options = Object.assign({}, Config.clockConfig, config);
    const time = getTime(options.time);

    const clock = new Clock(options, time);
    styleColors(options);
    clock.onStart();
}


function createDom() {
    if (document.getElementById(Config.clockId))
        throw Error("There is already one running grudus-timepicker instance!");

    const clockDiv = document.createElement("div");
    clockDiv.id = Config.clockId;
    clockDiv.innerHTML = clockHtml;
    document.body.appendChild(clockDiv);
}
