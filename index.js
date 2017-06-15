const headerMinutes = document.getElementsByClassName('g-minute')[0];
const headerHours = document.getElementsByClassName('g-hour')[0];
const clock = document.getElementsByClassName('g-clock')[0];

(function () {
    let date = new Date();
    headerHours.innerText = date.getHours();
    headerMinutes.innerText = date.getMinutes();
    toggleToHours();
})();

function toggleToMinutes() {
    headerHours.classList.remove('g-active');
    headerMinutes.classList.add('g-active');
    clock.innerText = "05 10 15 20 25 30 35 40 45 50 55 00"
}

function toggleToHours() {
    headerHours.classList.add('g-active');
    headerMinutes.classList.remove('g-active');
    clock.innerText = "1 2 3 4 5 6 7 8 9 10 11 12"
}