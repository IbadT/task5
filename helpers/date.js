const dateMaker = () => {
    const date = new Date();
    const replaceMonth = (date) => date.toString().split(' ').map(i => i.length > 1 ? i : '0' + i)
    const data = `${date.getDate()}-${replaceMonth(date.getMonth())}-${date.getFullYear()}`
    return data;
}

const clockMaker = () => {
    const date = new Date();
    const replaceTime = (date) => date.toString().split(' ').map(i => i.length > 1 ? i : '0' + i)
    const time = `${replaceTime(date.getHours())}:${replaceTime(date.getMinutes())}`;
    return time;
}

const date = dateMaker();
const time = clockMaker();

module.exports = {
    date,
    time
}