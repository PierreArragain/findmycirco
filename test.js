const getNumberFromString  = (string) => {
    if (typeof string !== "number") {
    let number = string.split(',');
    number = Number(number.join('.'));
    return number;
    } else {
        return string;
    }

}

console.log(getNumberFromString("1,25"));

console.log(getNumberFromString(1));