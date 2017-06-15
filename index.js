const headerMinutes = document.getElementsByClassName('g-minute')['0'];
const headerHours = document.getElementsByClassName('g-hour')['0'];
const clock = document.getElementsByClassName('g-clock')['0'];
const clockItems = document.getElementsByClassName('g-clock-item');
const hours = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
const Type = {HOURS: 'hours', MINUTES: 'minutes'};

let Clock = {
    size: {width: 0, height: 0},
    middle: {x: 0, y: 0},
    isMouseDown: false,
    selected: undefined,
    type: Type.MINUTES,

    calculateClockFace: () => {
        Clock.size.width = clock.clientWidth;
        Clock.size.height = clock.clientHeight;
        Clock.middle.x = Clock.size.width / 2;
        Clock.middle.y = Clock.size.height / 2;
        const radius = Clock.size.width / 2 - 20;
        for (let i = 0; i < clockItems.length; i++) {
            const angle = toRadians(i * 30);
            const item = clockItems[i];
            const itemWidth = item.offsetWidth;
            const itemHeight = item.offsetHeight;
            item.style.left = ((Clock.middle.x + Math.sin(angle) * radius) - itemWidth / 2) + 'px';
            item.style.bottom = ((Clock.middle.y + Math.cos(angle) * radius) - itemHeight / 2) + 'px'
        }
    },
    changeDisplayed: array => {
        for (let i = 0; i < clockItems.length; i++)
            clockItems[i].innerText = array[i]
    },

    selectTime: (event, isMouseDown) => {
        if (!(isMouseDown || Clock.isMouseDown))
            return;
        const mouse = findMousePosition(event, clock);
        const x = mouse.x - Clock.middle.x;
        const y = Clock.middle.y - mouse.y;
        const tangent = y / x;
        let angle = 90 - toDegrees(Math.atan(tangent));
        if (x < 0) angle += 180;

        if (Clock.selected)
            Clock.selected.classList.remove('g-selected');

        const index = Math.round(angle / 30) % 12;
        Clock.selected = clockItems[index];
        Clock.selected.classList.add('g-selected');
        Clock.updateTime(Clock.selected.innerText);
    },

    updateTime: newTime => {
        (Clock.type === Type.HOURS ? headerHours : headerMinutes).innerText = newTime;
    }
};

(function () {
    let date = new Date();
    headerHours.innerText = date.getHours();
    headerMinutes.innerText = date.getMinutes() < 10
        ? '0' + date.getMinutes() : date.getMinutes();
    Clock.calculateClockFace();
    Clock.type = Type.HOURS;
})();


function toggleToMinutes() {
    headerHours.classList.remove('g-active');
    headerMinutes.classList.add('g-active');
    if (Clock.type !== Type.MINUTES) {
        onEachClockElement(c => c.classList.add('g-fade-out'));
        Promise.delay(() => {
            onEachClockElement(c => c.classList.remove('g-fade-out'));
            Clock.changeDisplayed(minutes);
            Clock.calculateClockFace();
            Clock.type = Type.MINUTES;
        }, 300);
    }
}

function toggleToHours() {
    headerHours.classList.add('g-active');
    headerMinutes.classList.remove('g-active');
    if (Clock.type !== Type.HOURS) {
        onEachClockElement(c => c.classList.add('g-fade-out'));
        Promise.delay(() => {
            onEachClockElement(c => c.classList.remove('g-fade-out'));
            Clock.changeDisplayed(hours);
            Clock.calculateClockFace();
            Clock.type = Type.HOURS;
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