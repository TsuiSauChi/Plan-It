let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');

const KNN = require('ml-knn');
const csv = require('csvtojson');
const prompt = require('prompt');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

io.on('connection', (socket) => {

  socket.on('disconnect', function () {
    io.emit('users-changed', { user: socket.nickname, event: 'left' });
  });

  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', { user: nickname, event: 'joined' });
  });

  socket.on('add-message', (message) => {
    io.emit('message', { text: message.text, from: socket.nickname, created: new Date(), image: message.image });
  });
});

app.post('/form', function (req, res) {

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

    var data = req.body
    var name
    var langauge
    var country
    var birth
    var travel
    var image

    var planner = {
      name,
      langauge,
      country,
      birth,
      travel,
      image
    }

    if (knn.predict(data) == "0") {
      planner.name = "Nishikiri_M"
      planner.language = "English, Chinese"
      planner.country = "Korea, Japan"
      planner.birth = "Japan",
      planner.travel = "S$2000",
      planner.image = "../../assets/imgs/planner1.png"
    } else if (knn.predict(data) == "1") {
      planner.name = "Clarissa_Tan"
      planner.language = "English, Malay"
      planner.country = "Malaysia"
      planner.birth = "Singapore",
      planner.travel = "S$500"
      planner.image = "../../assets/imgs/planner2.png"
    } else if (knn.predict(data) == "2") {
      planner.name = "Song Ji Hyu"
      planner.language = "English, Tamil"
      planner.country = "Korea, Japan"
      planner.birth = "Singapore",
      planner.travel = "S$500"
      planner.image = "../../assets/imgs/planner3.png"
    } else if (knn.predict(data) == "3") {
      planner.name = "Kang So Ji"
      planner.language = "English, Chinese, Malay, Tamil"
      planner.country = "Korea, Malaysia"
      planner.birth = "Korea",
      planner.travel = "S$1500"
      planner.image = "../../assets/imgs/planner4.png"
    }

    console.log(planner.name);

    res.send({
      name: planner.name,
      language: planner.language,
      country: planner.country,
      birth: planner.birth,
      travel: planner.travel,
      image: planner.image
    })
  }

})


var port = process.env.PORT || 3000;

http.listen(port, function () {
  console.log('listening in http://localhost:' + port);
});