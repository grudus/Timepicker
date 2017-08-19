import extractTime from "./timeExtractor";

export default function (time) {
    const extractedTime = extractTime(time);
    return (extractedTime.hours < 10 ? "0" + extractedTime.hours : extractedTime.hours)
        + ":" + (extractedTime.minutes < 10 ? "0" + extractedTime.minutes : extractedTime.minutes);
}