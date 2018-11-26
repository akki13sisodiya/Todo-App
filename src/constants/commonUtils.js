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
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    return `${monthsWithThreeChar[date.getMonth()]} ${day}, ${date.getFullYear()}`;
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

export const isValidAndNonEmptyObject = (theObject) => {
    if (
        theObject &&
        typeof theObject === 'object' &&
        Object.keys(theObject).length > 0
    ) {
        return true;
    }
    return false;
};

export const persistData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const isDateValid = date => date instanceof Date && !Number.isNaN(date.getTime());

export const getDateInYYYYMMDDHyphen = (date) => {
    if (isDateValid(date)) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    return null;
};
