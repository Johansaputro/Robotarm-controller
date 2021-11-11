const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var router = express.Router();
var roboname = "";
var datatostring = "";
var counter = 0;
var mysql = require("mysql");
// var timeout = require('connect-timeout');
var db = mysql.createPool({
  host: "",
  user: "",
  password: "",
  port: "",
  database: ""
})

// function haltOnTimedout (req, res, next) {
//   if (!req.timedout) next()
// }


// app
app.use(bodyParser.urlencoded({extended: true}))

//static files
app.use(express.static('public'))
app.use('/CSS', express.static(__dirname + 'public/CSS'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

//set engines
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req,res) => {
  res.render('index');
});

app.post('/id', (req,res) => {
  roboname = req.body.roboid;
  // console.log(roboname);
  // db.query("INSERT INTO Robo(RoboId) VALUES (?)",[roboname] , function(err, rs) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  // });
  db.query("UPDATE Robo SET Movement = ? WHERE RoboId = ?",[0, roboname], function(err,rs) {
    if (err) throw err;
    // console.log("Sequence updated")
  });
  db.query("UPDATE Robo SET Sequence = ? WHERE RoboID = ?",[0, roboname] , function(err,rs) {
    if (err) throw err;
  })
  // res.redirect('/');
  res.status(204).send();
});

app.post('/moveit', (req,res) => {
  var moveType = req.body.movement;
  counter = counter + 1
  // counterr = counterr + 1;

  db.query("UPDATE Robo SET Movement = ? WHERE RoboId = ?",[moveType, roboname] , function(err, rs) {
    if (err) throw err;
    // var datatoSend = {
    //   IdMobil: name1,
    //   Movement: correctorwrong,
    //   Counterr: counterr
    // };
    //
    // datatostring = JSON.stringify(datatoSend);
    // console.log("Movement updated");
  });
  db.query("UPDATE Robo SET Sequence = ? WHERE RoboID = ?",[counter, roboname] , function(err,rs) {
    if (err) throw err;
  })
  // db.query("UPDATE Mobil SET Sequence = ? WHERE IdMobil = ?",[counterr, name1], function(err,rs) {
  //   if (err) throw err;
  //   // console.log("Sequence updated")
  // });
  res.status(204).send();
});

app.get('/id', (req,res) => {
  res.send(roboname);
})

app.get('/moveit', (req, res) => {
  db.query("SELECT * From Robo WHERE RoboId = ?",[roboname], function(err, rs) {
    if (err) throw err;
    datatostring = JSON.stringify(rs);
  })
  res.send(datatostring);
});

app.get('/test', (req,res) => {
  if (db!=null) {
    res.send("success");
  } else {
    res.send("fail");
  }
});

app.get('/show', function(req,res,next)  {
  db.query('SELECT * FROM Robo WHERE RoboId = ?',[roboname], function(err,rs){
    if(err) {
      console.log(err);
    } else {
      console.log(rs);
    }
  });
});


app.listen(process.env.PORT || 4000, function(){
  console.log("Server started on port 4000");
});
