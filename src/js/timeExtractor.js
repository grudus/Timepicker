const hoursRegex = /^([0-1]?[0-9]|2[0-3])$/;
const minutesRegex = /^([0-5][0-9])$/;
const regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

export default function extractTime(date) {
    if (!date)
        return fromDate(new Date());
    else if (date instanceof Date)
        return fromDate(date);
    else if (hoursRegex.test(date.hours) && minutesRegex.test(date.minutes))
        return {hours: parseInt(date.hours), minutes: parseInt(date.minutes)};
    else if (regex.test(date))
        return fromRegex(date);
    else
        throw new TypeError("Time must be a Date or 'hh:MM' string or " + "object with `hours` and `minutes` fields");
}

function fromRegex(date) {
    const parsed = regex.exec(date);
    return {hours: parseInt(parsed[1]), minutes: parseInt(parsed[2])};
}

function fromDate(date) {
    return {hours: date.getHours(), minutes: date.getMinutes()};
}