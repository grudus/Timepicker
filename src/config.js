const clockId = "grudus-clock";

const clockConfig = {
    onSubmit: (time) => console.log(`Time: ${time.hours}:${time.minutes}`),
    onClose: () => document.body.removeChild(document.getElementById(clockId))
};

export default {clockId, clockConfig};