export const monthsWithThreeChar = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getTimeWithAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
    return `${hours}:${minutes} ${ampm}`;
};

export const getDateInMonthDDYYYYFormat = (date) => {
    if (date) {
        return `${monthsWithThreeChar[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
    return '';
};

export const sortData = (data, sortCol, sortAsc = true) => {
    const sortedArr = [ ...data ];
    sortedArr.sort((a, b) => {
        if (sortAsc) {
            return a[sortCol] < b[sortCol] ? -1 : 1;
        }
        return a[sortCol] < b[sortCol] ? 1 : -1;
    });
    return sortedArr;
};