const headerMinutes = document.getElementsByClassName('g-minute')['0'];
const headerHours = document.getElementsByClassName('g-hour')['0'];
const clock = document.getElementsByClassName('g-clock')['0'];
const clockItems = document.getElementsByClassName('g-clock-item');
const hours = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

let Clock = {
    isMouseDown: false,
    calculateClockFace: () => {
        const width = clock.clientWidth;
        const height = clock.clientHeight;
        const middleX = width / 2;
        const middleY = height / 2;
        const radius = width / 2 - 20;
        for (let i = 0; i < clockItems.length; i++) {
            const angle = toRadians(i * 30);
            const item = clockItems[i];
            const itemWidth = item.offsetWidth;
            const itemHeight = item.offsetHeight;
            item.style.left = ((middleX + Math.sin(angle) * radius) - itemWidth / 2) + 'px';
            item.style.bottom = ((middleY + Math.cos(angle) * radius) - itemHeight / 2) + 'px'
        }
    },
    changeDisplayed: array => {
        for (let i = 0; i < clockItems.length; i++)
            clockItems[i].innerText = array[i]
    },

    selectTime: (event, isMouseDown) => {
        if (isMouseDown || Clock.isMouseDown)
            console.log(`${event.clientX}, ${event.clientY}`)
    }
};

(function () {
    let date = new Date();
    headerHours.innerText = date.getHours();
    headerMinutes.innerText = date.getMinutes() < 10
        ? '0' + date.getMinutes() : date.getMinutes();
    toggleToHours();
})();


function toggleToMinutes() {
    headerHours.classList.remove('g-active');
    headerMinutes.classList.add('g-active');
    Clock.changeDisplayed(minutes);
    Clock.calculateClockFace()
}

function toggleToHours() {
    headerHours.classList.add('g-active');
    headerMinutes.classList.remove('g-active');
    Clock.changeDisplayed(hours);
    Clock.calculateClockFace()
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}