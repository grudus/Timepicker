function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function findMousePosition(event, object) {
    const rect = object.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function delay(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t);
    });
}

Promise.delay = function (fn, t) {
    if (!t) {
        t = fn;
        fn = function () {
        };
    }
    return delay(t).then(fn);
};

Promise.prototype.delay = function (fn, t) {
    return this.then(function () {
        return Promise.delay(fn, t);
    });
};

export default {toRadians, toDegrees, findMousePosition};