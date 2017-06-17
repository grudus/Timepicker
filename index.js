const headerMinutes = document.getElementsByClassName('g-minute')['0'];
const headerHours = document.getElementsByClassName('g-hour')['0'];
const clockElem = document.getElementsByClassName('g-clock')['0'];
const innerClockElem = document.getElementsByClassName('g-clock g-clock-inner')['0'];
let clockItems = [];
let innerClockItems = [];
let outerClockItems = [];
let clock;
let currentTime = {};
const Type = {HOURS: 'hours', MINUTES: 'minutes'};


const MinutesFace = {
    displayed: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
    type: Type.MINUTES,
    selected: undefined,

    onEnter: () => {
        onEachClockElement(c => c.classList.remove('g-selected'));
        MinutesFace.selected = MinutesFace.findSelected(currentTime.minutes);
        MinutesFace.selected.classList.add('g-selected');
    },
    onLeave: () => {
        if (MinutesFace.selected) {
            MinutesFace.selected.classList.remove('g-selected');
            MinutesFace.selected = undefined;
        }
    },
    selectTime: (angle) => {
        if (MinutesFace.selected)
            MinutesFace.selected.classList.remove('g-selected');

        const minute = Math.round(angle / 6) % 60;
        MinutesFace.selected = MinutesFace.findSelected(minute);
        MinutesFace.selected.classList.add('g-selected');
        currentTime.minutes = minute;
        updateDisplayedTime();
    },

    findSelected: (minute) => {
        return (minute % 5 === 0) ? clockItems[minute / 5] : outerClockItems[minute];
    }
};

const HoursFace = {
    displayed: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    displayedInner: ['00', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
    type: Type.HOURS,
    selected: undefined,

    onEnter: () => {
        innerClockElem.style.display = 'block';
        onEachClockElement(c => c.classList.remove('g-selected'));
        HoursFace.selected = currentTime.hour < 13
            ? clockItems[currentTime.hour % 12]
            : innerClockItems[currentTime.hour % 12];
        HoursFace.selected.classList.add('g-selected');
    },
    onLeave: () => {
        innerClockElem.style.display = 'none';
        if (HoursFace.selected) {
            HoursFace.selected.classList.remove('g-selected');
            HoursFace.selected = undefined;
        }

    },
    selectTime: (angle, elem) => {
        if (HoursFace.selected)
            HoursFace.selected.classList.remove('g-selected');

        const index = Math.round(angle / 30) % 12;
        HoursFace.selected = (elem === innerClockElem ? innerClockItems : clockItems)[index];
        HoursFace.selected.classList.add('g-selected');
        currentTime.hour = parseInt(HoursFace.selected.innerText);
        updateDisplayedTime();
    }


};

class Clock {
    constructor() {
        this.size = {width: 0, height: 0};
        this.middle = {x: 0, y: 0};
        this.isMouseDown = false;
        this.selected = undefined;
        this.currentFace = MinutesFace;
    }


    calculateClockFace() {
        this.size.width = clockElem.offsetWidth;
        this.size.height = clockElem.offsetHeight;
        this.middle.x = this.size.width / 2;
        this.middle.y = this.size.height / 2;
        const radius = this.size.width / 2 - 20;

        const innerWidth = innerClockElem.offsetWidth;
        const innerHeight = innerClockElem.offsetHeight;
        const middleX = innerWidth / 2;
        const middleY = innerHeight / 2;

        this.doCalculateClockFace(this.middle.x, this.middle.y, radius, clockItems);
        this.doCalculateClockFace(middleX, middleY, radius - 40, innerClockItems);
        this.doCalculateClockFace(this.middle.x, this.middle.y, radius, outerClockItems)
    };

    doCalculateClockFace(middleX, middleY, radius, items) {
        const angleQuantum = 360 / items.length;
        for (let i = 0; i < items.length; i++) {

            const angle = toRadians(i * angleQuantum);
            const item = items[i];
            const itemWidth = item.offsetWidth;
            const itemHeight = item.offsetHeight;

            item.style.left = ((middleX + Math.sin(angle) * radius) - itemWidth / 2) + 'px';
            item.style.bottom = ((middleY + Math.cos(angle) * radius) - itemHeight / 2) + 'px'
        }
    }

    changeDisplayed(array) {
        for (let i = 0; i < clockItems.length; i++)
            clockItems[i].innerText = array[i]
    };

    selectTime(event, isMouseDown, elem) {
        if (!(isMouseDown || this.isMouseDown))
            return;
        const mouse = findMousePosition(event, clockElem);
        const x = mouse.x - this.middle.x;
        const y = this.middle.y - mouse.y;
        let angle = 90 - toDegrees(Math.atan(y / x));
        if (x < 0) angle += 180;

        this.currentFace.selectTime(angle, elem);
        event.stopPropagation();
    };
}

function createClockFace() {
    doCreate(clockItems, clockElem, span => span.classList.add('g-clock-item'));
    doCreate(innerClockItems, innerClockElem, (span, i) => {
        span.classList.add('g-clock-item', 'g-clock-inner');
        span.innerText = HoursFace.displayedInner[i];
    });

    for (let i = 0; i < 60; i++) {
        let span = document.createElement('span');
        span.classList.add('g-clock-outer');
        outerClockItems.push(span);
        clockElem.appendChild(span);
    }

    function doCreate(_clockItems, _clockElem, fun) {
        for (let i = 0; i < 12; i++) {
            let span = document.createElement('span');
            fun(span, i);
            _clockItems.push(span);
            _clockElem.appendChild(span);
        }
    }
}

function toggleToMinutes() {
    HoursFace.onLeave();
    toggleTime(headerHours, headerMinutes, MinutesFace);
}

function toggleToHours() {
    MinutesFace.onLeave();
    toggleTime(headerMinutes, headerHours, HoursFace);
}

function toggleTime(objectToRemoveClass, objectToAddClass, face) {
    objectToRemoveClass.classList.remove('g-active');
    objectToAddClass.classList.add('g-active');
    if (clock.currentFace !== face) {
        onEachClockElement(c => c.classList.add('g-fade-out'));
        Promise.delay(() => {
            onEachClockElement(c => c.classList.remove('g-fade-out'));
            clock.changeDisplayed(face.displayed);
            clock.currentFace = face;
            face.onEnter();
        }, 300);
    }
}

function updateDisplayedTime() {
    if (currentTime.hour < 10)
        headerHours.innerText = '0' + currentTime.hour;
    else headerHours.innerText = currentTime.hour;
    if (currentTime.minutes < 10)
        headerMinutes.innerText = '0' + currentTime.minutes;
    else headerMinutes.innerText = currentTime.minutes;
}

// start !!!! ##################################


(function () {
    let date = new Date();
    currentTime = {hour: date.getHours(), minutes: date.getMinutes()};
    updateDisplayedTime();
    createClockFace();
    clock = new Clock();
    clock.changeDisplayed(HoursFace.displayed);
    clock.calculateClockFace();
    clock.currentFace = HoursFace;
})();


// utils ####################################3
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