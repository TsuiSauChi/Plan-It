const KNN = require('ml-knn');
const csv = require('csvtojson');
const prompt = require('prompt');
let knn;

const csvFilePath = 'planit.csv';

let seperationSize

let data = [],
    x = [],
    y = [];

let trainingSetX = [],
    trainingSetY = [],
    testSetX = [],
    testSetY = [];

csv().fromFile(csvFilePath).on('json', (josnObj) => {
    data.push(josnObj);
}).on('done', (error) => {
    dressData();
})

function dressData() {
    let types = new Set();

    data.forEach((row => {
        types.add(row.Planner)
    }));

    typesArray = [...types]; //Convert Set to Array

    data.forEach((row) => {
        let rowArray, typeNumber
        rowArray = Object.keys(row).map(key => parseFloat(row[key])).slice(0, 4);
        typeNumber = typesArray.indexOf(row.Planner);
        x.push(rowArray);
        y.push(typeNumber);
    });
    trainingSetX = x;
    trainingSetY = y;
    train();
}

function train() {
    knn = new KNN(trainingSetX, trainingSetY);
    const dataSetLength = trainingSetX.length;
    console.log(`Data Set Size = ${dataSetLength}`);
    predict();
}

function predict() {
    let temp = [];
    prompt.start();
    prompt.get(['Langauge', 'Country', 'Local', 'Budget'], function (err, result) {
        console.log(result);

        if (!err) {
            for (var key in result) {
                temp.push(parseFloat(result[key]));
                console.log(temp);
            }
        }

        var planner;
        if (knn.predict(temp) == "0") {
            planner = "Nishikiri_M"
        } else if (knn.predict(temp) == "1") {
            planner = "Clarissa_Tan"
        } else if (knn.predict(temp) == "2") {
            planner = "Song Ji Hyu"
        } else if (knn.predict(temp) == "3") {
            planner = "Kang So Ji"
        }

        console.log(`Result:  =  ${planner}`);
    })
}