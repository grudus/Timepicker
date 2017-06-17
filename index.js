const headerMinutes = document.getElementsByClassName('g-minute')['0'];
const headerHours = document.getElementsByClassName('g-hour')['0'];
const clockElem = document.getElementsByClassName('g-clock')['0'];
const innerClockElem = document.getElementsByClassName('g-clock g-clock-inner')['0'];
const handOfAClock = document.getElementsByClassName('g-hand-of-a-clock')['0'];
let clockItems = [];
let innerClockItems = [];
let outerClockItems = [];
let clock;
let minutesFace;
let hoursFace;
let currentTime = {};
const Type = {HOURS: 'hours', MINUTES: 'minutes'};


class MinutesFace {

    constructor() {
        this.displayed = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
        this.type = Type.MINUTES;
        this.selected = undefined;
    }

    onEnter() {
        onEachClockElement(c => c.classList.remove('g-selected'));
        this.selected = this.findSelected(currentTime.minutes);
        this.selected.classList.add('g-selected');
        clock.calculateHandOfTheClock(currentTime.minutes * 6)
    };

    onLeave() {
        if (this.selected) {
            this.selected.classList.remove('g-selected');
            this.selected = undefined;
        }
    }

    selectTime(angle) {
        if (this.selected)
            this.selected.classList.remove('g-selected');

        const minute = Math.round(angle / 6) % 60;
        this.selected = this.findSelected(minute);
        this.selected.classList.add('g-selected');
        currentTime.minutes = minute;
        updateDisplayedTime();
        clock.calculateHandOfTheClock(angle)
    };


    findSelected(minute) {
        return (minute % 5 === 0) ? clockItems[minute / 5] : outerClockItems[minute];
    }
}


class HoursFace {
    constructor() {
        this.displayed = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
        this.displayedInner = ['00', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
        this.type = Type.HOURS;
        this.selected = undefined;
    }

    onEnter() {
        innerClockElem.style.display = 'block';
        onEachClockElement(c => c.classList.remove('g-selected'));
        this.selected = currentTime.hour < 13
            ? clockItems[currentTime.hour % 12]
            : innerClockItems[currentTime.hour % 12];
        this.selected.classList.add('g-selected');

        clock.calculateHandOfTheClock((currentTime.hour % 12) * 30, currentTime.hour < 13
            ? clock.itemsRadius : clock.itemsRadius - 50)
    }

    onLeave() {
        innerClockElem.style.display = 'none';
        if (this.selected) {
            this.selected.classList.remove('g-selected');
            this.selected = undefined;
        }

    }

    selectTime(angle, elem) {
        if (this.selected)
            this.selected.classList.remove('g-selected');

        const index = Math.round(angle / 30) % 12;
        this.selected = (elem === innerClockElem ? innerClockItems : clockItems)[index];
        this.selected.classList.add('g-selected');
        currentTime.hour = parseInt(this.selected.innerText);
        updateDisplayedTime();

        clock.calculateHandOfTheClock(Math.round(angle / 30) * 30, elem === innerClockElem
            ? clock.itemsRadius - 50 : clock.itemsRadius)
    }
}

class Clock {
    constructor() {
        this.size = {width: 0, height: 0};
        this.middle = {x: 0, y: 0};
        this.isMouseDown = false;
        this.selected = undefined;
        this.currentFace = minutesFace;
        this.itemsRadius = 0;
    }

    calculateHandOfTheClock(angle, size = this.itemsRadius) {
        handOfAClock.style.transform = `rotate(${angle - 90}deg)`;
        handOfAClock.style.width = size + 'px';
    }

    calculateClockFace() {
        this.size.width = clockElem.offsetWidth;
        this.size.height = clockElem.offsetHeight;
        this.middle.x = this.size.width / 2;
        this.middle.y = this.size.height / 2;
        this.itemsRadius = this.size.width / 2 - 20;

        const innerWidth = innerClockElem.offsetWidth;
        const innerHeight = innerClockElem.offsetHeight;
        const middleX = innerWidth / 2;
        const middleY = innerHeight / 2;

        this.doCalculateClockFace(this.middle.x, this.middle.y, this.itemsRadius, clockItems);
        this.doCalculateClockFace(middleX, middleY, this.itemsRadius - 40, innerClockItems);
        this.doCalculateClockFace(this.middle.x, this.middle.y, this.itemsRadius, outerClockItems)
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
        span.innerText = hoursFace.displayedInner[i];
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
    hoursFace.onLeave();
    toggleTime(headerHours, headerMinutes, minutesFace);
}

function toggleToHours() {
    minutesFace.onLeave();
    toggleTime(headerMinutes, headerHours, hoursFace);
}

function toggleTime(objectToRemoveClass, objectToAddClass, face) {
    objectToRemoveClass.classList.remove('g-active');
    objectToAddClass.classList.add('g-active');
    if (clock.currentFace !== face) {
        onEachClockElement(c => c.classList.add('g-fade-out'));
        handOfAClock.classList.add('g-fade-out');
        Promise.delay(() => {
            onEachClockElement(c => c.classList.remove('g-fade-out'));
            handOfAClock.classList.remove('g-fade-out');
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
    clock = new Clock();
    minutesFace = new MinutesFace();
    hoursFace = new HoursFace();
    currentTime = {hour: date.getHours(), minutes: date.getMinutes()};
    updateDisplayedTime();
    createClockFace();
    clock.changeDisplayed(hoursFace.displayed);
    clock.calculateClockFace();
    clock.currentFace = hoursFace;
    hoursFace.onEnter();
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