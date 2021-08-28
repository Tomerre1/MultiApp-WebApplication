export const utilService = {
    makeId,
    makeLorem,
    getRandomInt,
    randomDate,
    getRandomColor,
    convertDateToFormat,

    //Books
    getRandomIntInclusive,
    debounce,
    getCurrencyIcon
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate() {
    var start = new Date(getRandomInt(2000, 2021), 0, 1);
    var end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).valueOf();
}


function convertDateToFormat(d) {
    d = new Date(d);
    return ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' +
        d.getFullYear() + ', ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
}

function getRandomColor() {
    const blue = '#2196F3';
    const green = '#8BC34A';
    const yellow = '#FBE870';
    const red = '#FD3A4A';
    const purple = '#FF6EFF'
    const pink = '#F653A6'
    const orange = '#FF7F49'
    const colors = [red, 'white', blue, 'white', green, yellow, 'white', purple, pink, orange]
    return colors.splice(getRandomInt(0, 9), 1)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

function getCurrencyIcon(book) {
    let icon = ''
    switch (book.listPrice.currencyCode) {
        case 'ILS':
            icon = '₪'
            break;
        case 'EUR':
            icon = '€'
            break;
        case 'USD':
            icon = '$'
            break;

        default:
            break;
    }
    return icon
}