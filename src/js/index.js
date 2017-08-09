import clockHtml from "./meta/clockHtml";
import Config from "./meta/config";
import Clock from "./clock";

function showPicker(config = {}) {
    const options = Object.assign({}, Config.clockConfig, config);
    const clockDiv = document.createElement("div");
    clockDiv.id = Config.clockId;
    clockDiv.innerHTML = clockHtml;
    document.body.appendChild(clockDiv);

    new Clock(options);
}

export {showPicker};
