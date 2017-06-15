const headerMinutes = document.getElementsByClassName('g-minute')['0'];
const headerHours = document.getElementsByClassName('g-hour')['0'];
const clock = document.getElementsByClassName('g-clock')['0'];
const clockItems = document.getElementsByClassName('g-clock-item');
const hours = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

(function () {
    let date = new Date();
    headerHours.innerText = date.getHours();
    headerMinutes.innerText = date.getMinutes();
    calculateClockFace();
})();

function toggleToMinutes() {
    headerHours.classList.remove('g-active');
    headerMinutes.classList.add('g-active');
    for (let i = 0; i < clockItems.length; i++)
        clockItems[i].innerText = minutes[i];
    calculateClockFace()
}

function toggleToHours() {
    headerHours.classList.add('g-active');
    headerMinutes.classList.remove('g-active');
    changeClock(1, 12, 1);
    for (let i = 0; i < clockItems.length; i++)
        clockItems[i].innerText = hours[i]
    calculateClockFace()
}

function changeClock(start, end, skip) {
    let current = start;
    for (let i = 0; i < clockItems.length; i++) {
        if (current <= end) {
            clockItems[i].innerText = current;
            current += skip;
        }
    }
}

function calculateClockFace() {
    const middleX = clock.clientWidth / 2;
    const middleY = clock.clientHeight / 2;
    const radius = middleX / 2 - 20;
    for (let i = 0; i < clockItems.length; i++) {
        const angle = toRadians(i * 30);
        let item = clockItems[i];
        const itemWidth = item.offsetWidth;
        const itemHeight = item.offsetHeight;
        item.style.left = ((middleX + Math.sin(angle) * radius) - itemWidth / 2) + 'px';
        item.style.bottom = ((middleY + Math.cos(angle) * radius) - itemHeight / 2) + 'px'
    }
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}