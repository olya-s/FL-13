function convert(...rest) {
  const convertedValues = [];
  for (let value of rest) {
    if (typeof value === 'string') {
      convertedValues.push(+value);
    } else {
      convertedValues.push(value + '');
    }
  }
  return convertedValues;
}

function executeForEach(arr, func) {
  for (let value of arr) {
    func(value);
  }
}

function mapArray(arr, func) {
  const transformedArray = [];
  executeForEach(arr, item => {
    return transformedArray.push(func(+item));
  });
  return transformedArray;
}

function filterArray(arr, func) {
  const filteredArray = [];
  executeForEach(arr, (item) => {
    if (func(item)) {
      return filteredArray.push(item);
    }
  });
  return filteredArray;
}

function containsValue(arr, value) {
  let isContains = false;
  executeForEach(arr, (item) => {
    if (item === value) {
      isContains = true;
    }
  });
  return isContains;
}

function flipOver(str) {
  let reversedString = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversedString += str[i];
  }
  return reversedString;
}

function makeListFromRange(range) {
  const listFromRange = [];
  let elem = range[0] < range[1] ? range[0] : range[1];
  const LAST_ELEM = range[0] < range[1] ? range[1] : range[0];
  do {
    listFromRange.push(elem);
    elem += 1;
  } while (elem <= LAST_ELEM);
  return listFromRange;
}

function getArrayOfKeys(arr, key) {
  const arrayOfKeys = [];
  for (let value of arr) {
    arrayOfKeys.push(value[key]);
  }
  return arrayOfKeys;
}

function substitute(arr) {
  const newArray = [];
  const LOWER_LIMIT = 10;
  const UPPER_LIMIT = 20;
  executeForEach(arr, (item) => {
    if (item > LOWER_LIMIT && item < UPPER_LIMIT) {
      newArray.push('*');
    } else {
      newArray.push(item);
    }
  });
  return newArray;
}

function getPastDay(date, amountOfDays) {
  const MILLISECONDS_PER_DAY = 86400000;
  const amountOfMilliseconds = amountOfDays * MILLISECONDS_PER_DAY;
  const pastDay = new Date(date.getTime() - amountOfMilliseconds);
  return pastDay.getDate();
}

function formatDate(date) {
  const parts = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes()
  };
  for (let key in parts) {
    if ({}.hasOwnProperty.call(parts, key)) {
      const SMALLEST_TWO_DIGIT = 10;
      if (parts[key] < SMALLEST_TWO_DIGIT) {
        parts[key] = '0' + parts[key];
      }
    }
  }
  const formattedDate = `${parts.year}/${parts.month}/${parts.day} ${parts.hours}:${parts.minutes}`;
  return formattedDate;
}
