function readF64(addr) {
    return Number(h5gg.getValue(addr, "F64"));
}

function readU64(addr) {
    return Number(h5gg.getValue(addr, "U64"));
}

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

function mostFrequentElement(arr) {
    let frequencyCounter = {};
    arr.forEach(element => {
        frequencyCounter[element] = (frequencyCounter[element] || 0) + 1;
    });
    let mostFrequent = null;
    let highestFrequency = 0;
    for (let key in frequencyCounter) {
        if (frequencyCounter[key] > highestFrequency) {
            mostFrequent = key;
            highestFrequency = frequencyCounter[key];
        }
    }
    return mostFrequent;
}

function doubleToHexIEEE754(number) {
    let buffer = new ArrayBuffer(8);
    let view = new DataView(buffer);
    view.setFloat64(0, number);

    let hexString = '';
    for (let i = 0; i < 8; i++) {
        let byte = view.getUint8(i).toString(16).toUpperCase();
        if (byte.length === 1) {
            byte = '0' + byte;
        }
        hexString += byte;
    }

    return BigInt('0x' + hexString).toString();
}

alert("Made in Az1520");

valueatk = Number(prompt("Enter final atk", ""));
runAtk = confirm("Run one hit kill?");
valuedef = Number(prompt("Enter final def", ""));
runDef = confirm("Run god mode?");

if (runAtk && !isInt(valueatk)) {
    h5gg.clearResults();
    min = doubleToHexIEEE754(valueatk * 1000 - 50);
    max = doubleToHexIEEE754(valueatk * 1000 + 49);
    h5gg.searchNumber(min + '~' + max, 'U64', '0x100000000', '0x200000000');
    results = h5gg.getResults(h5gg.getResultsCount());
    array = [];
    for (i = 0; i < results.length; i++) {
        read = readU64(results[i].address);
        if (read >= min && read <= max) {
            array.push(results[i].value);
        }
    }
    valueatk = mostFrequentElement(array);
} else if (runAtk) {
    valueatk = doubleToHexIEEE754(valueatk);
}

if (runDef && !isInt(valuedef)) {
    h5gg.clearResults();
    min = doubleToHexIEEE754(valuedef * 1000 - 50);
    max = doubleToHexIEEE754(valuedef * 1000 + 49);
    h5gg.searchNumber(min + '~' + max, 'U64', '0x100000000', '0x200000000');
    results = h5gg.getResults(h5gg.getResultsCount());
    array = [];
    for (i = 0; i < results.length; i++) {
        read = readU64(results[i].address);
        if (read >= min && read <= max) {
            array.push(results[i].value);
        }
    }
    valuedef = mostFrequentElement(array);
} else if (runDef) {
    valuedef = doubleToHexIEEE754(valuedef);
}



setInterval(function () {
    if (runAtk) {
        h5gg.clearResults();
        h5gg.searchNumber(valueatk, 'U64', '0x100000000', '0x200000000');
        if (h5gg.getResultsCount() == 0) {
            return;
        }
        h5gg.searchNumber(valueatk, 'U64', '0x100000000', '0x200000000');
        if (h5gg.getResultsCount() > 0) {
            h5gg.editAll("15000", "F64");
        }
    }

    if (runDef) {
        h5gg.clearResults();
        h5gg.searchNumber(valuedef, 'U64', '0x100000000', '0x200000000');
        if (h5gg.getResultsCount() == 0) {
            return;
        }
        h5gg.searchNumber(valuedef, 'U64', '0x100000000', '0x200000000');
        if (h5gg.getResultsCount() > 0) {
            h5gg.editAll("5000", "F64");
        }
    }
},
    1
);
