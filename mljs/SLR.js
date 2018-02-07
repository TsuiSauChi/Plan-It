const ml = require('ml-regression');
const csv = require('csvtojson');
const readLine = require('readline');
const SLR = ml.SLR;

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

const csvtojson = 'advertising.csv';
let csvData = [],
    x = [],
    y = [];

let regressionModel;

csv().fromFile(csvtojson).on('json', (jsonObj) => {
    csvData.push(jsonObj);
}).on('done', () => {
    dressData(); // To get data points from JSON Objects
    performRegression();
})

function dressData() {
    csvData.forEach((row => {
        x.push(f(row.radio));
        y.push(f(row.sales));
    }));
}

function f(s) {
    return parseFloat(s);
}

function performRegression() {
    regressionModel = new SLR(x, y);
    console.log(regressionModel, regressionModel.toString(3));
    predictOutput();
}

function predictOutput() {
    rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer) => {
        console.log(`At X = ${answer}, y =  ${regressionModel.predict(parseFloat(answer))}`);
        predictOutput();
    })
}
