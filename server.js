var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('courselist', ['courselist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/courses', function (req, res) {
  console.log('I received a GET request');

  db.courselist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.get('/courses/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.courselist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
app.post('/courses', function (req, res) {
  console.log(req.body);
  db.courselist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.put('/courses/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.code);
  db.courselist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {code: req.body.code, name: req.body.name, period: req.body.period}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.delete('/courses/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.courselist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.listen(3000);
console.log("Server running on port 3000");