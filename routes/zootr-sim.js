var express = require('express');
var path = require('path');
var request = require('request');
var router = express.Router();

var meta = {
  title: "ZOoTR Sim",
  description: "Simulator to practice and play Ocarina of Time Randomizer seeds.",
  url: "http://scatter.live/zootr-sim",
  image: "http://scatter.live/images/zootr-sim/ocarina.png",
  type: "website",
  card: "summary",
};

router.get('/', function(req, res, next) {
  res.render('zootr-sim', {meta: meta});
});

router.get('/getspoiler', function(req, res, next) {
  if (req.query.valid) {
    request('https://www.ootrandomizer.com/api/seed/create?key='+process.env.ZOOTRAPIKEY+'&version=5&settingsString='+req.query.settings+'&seed='+req.query.seed, function (error, response, body) {
      res.send(body);
    });
  }
  else {
    res.sendStatus(403);
  }
});

module.exports = router;

