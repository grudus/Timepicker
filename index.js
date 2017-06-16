const headerMinutes = document.getElementsByClassName('g-minute')['0'];
const headerHours = document.getElementsByClassName('g-hour')['0'];
const clockElem = document.getElementsByClassName('g-clock')['0'];
let clockItems = [];
let clock;
const hours = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
const Type = {HOURS: 'hours', MINUTES: 'minutes'};


class Clock {
    constructor() {
        this.size = {width: 0, height: 0};
        this.middle = {x: 0, y: 0};
        this.isMouseDown = false;
        this.selected = undefined;
        this.type = Type.MINUTES;
    }


    calculateClockFace() {
        this.size.width = clockElem.clientWidth;
        this.size.height = clockElem.clientHeight;
        this.middle.x = this.size.width / 2;
        this.middle.y = this.size.height / 2;
        const radius = this.size.width / 2 - 20;
        for (let i = 0; i < clockItems.length; i++) {
            const angle = toRadians(i * 30);
            const item = clockItems[i];
            const itemWidth = item.offsetWidth;
            const itemHeight = item.offsetHeight;
            item.style.left = ((this.middle.x + Math.sin(angle) * radius) - itemWidth / 2) + 'px';
            item.style.bottom = ((this.middle.y + Math.cos(angle) * radius) - itemHeight / 2) + 'px'
        }
    };

    static changeDisplayed(array) {
        for (let i = 0; i < clockItems.length; i++)
            clockItems[i].innerText = array[i]
    };

    selectTime(event, isMouseDown) {
        if (!(isMouseDown || this.isMouseDown))
            return;
        const mouse = findMousePosition(event, clockElem);
        const x = mouse.x - this.middle.x;
        const y = this.middle.y - mouse.y;
        let angle = 90 - toDegrees(Math.atan(y / x));
        if (x < 0) angle += 180;

        if (this.selected)
            this.selected.classList.remove('g-selected');

        const index = Math.round(angle / 30) % 12;
        this.selected = clockItems[index];
        this.selected.classList.add('g-selected');
        this.updateTime(this.selected.innerText);
    };

    updateTime(newTime) {
        (this.type === Type.HOURS ? headerHours : headerMinutes).innerText = newTime;
    };
}

(function () {
    let date = new Date();
    headerHours.innerText = date.getHours();
    headerMinutes.innerText = date.getMinutes() < 10
        ? '0' + date.getMinutes() : date.getMinutes();
    createClockFace();
    clock = new Clock();
    Clock.changeDisplayed(hours);
    clock.calculateClockFace();
    clock.type = Type.HOURS;
})();

function createClockFace() {
    for (let i = 0; i < 12; i++) {
        let span = document.createElement('span');
        span.classList.add('g-clock-item');
        clockItems.push(span);
        clockElem.appendChild(span);
    }
}


function toggleToMinutes() {
    headerHours.classList.remove('g-active');
    headerMinutes.classList.add('g-active');
    if (clock.type !== Type.MINUTES) {
        onEachClockElement(c => c.classList.add('g-fade-out'));
        Promise.delay(() => {
            onEachClockElement(c => c.classList.remove('g-fade-out'));
            Clock.changeDisplayed(minutes);
            clock.calculateClockFace();
            clock.type = Type.MINUTES;
        }, 300);
    }
}

function toggleToHours() {
    headerHours.classList.add('g-active');
    headerMinutes.classList.remove('g-active');
    if (clock.type !== Type.HOURS) {
        onEachClockElement(c => c.classList.add('g-fade-out'));
        Promise.delay(() => {
            onEachClockElement(c => c.classList.remove('g-fade-out'));
            Clock.changeDisplayed(hours);
            clock.calculateClockFace();
            clock.type = Type.HOURS;
        }, 300);

    }
}

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
    }
}

function onEachClockElement(fun) {
    [].forEach.call(clockItems, c => fun(c))
}

function delay(t) {
    console.log('delay' + t);
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