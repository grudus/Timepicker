import formatTime from "./timeFormatter";
import showPicker from "./timepickerCreator";

export default {
    showPicker: (config) => showPicker(config),
    format: (time) => formatTime(time)
};

