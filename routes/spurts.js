var express = require('express');
var path = require('path');
var request = require('request');
var router = express.Router();

var meta = {
  title: "Spurts Tracker",
  description: "DK64 Rando Tracker",
  url: "http://scatter.live/spurts",
  image: "http://scatter.live/images/spurts.png",
  type: "website",
  card: "summary",
};

var kongs = [
  'donkey', 'diddy', 'lanky', 'tiny', 'chunky'
];

var kongupgrades = [
  'gun', 'instrument', 'pad', 'barrel', 'unique'
];

var extraupgrades = [
  'melons1', 'ammo50', 'homing', 'inst3', 'ss',
];

var extraupgrades = [
  'melons', 'ammocap', 'homing', 'sniper', 'instcap', 'slam'
];

var worlds = [
  'isles', 'japes', 'aztec', 'factory', 'galleon', 'forest', 'caves', 'castle', 'helm'
];

router.get('/', function(req, res, next) {
  res.render('spurts', {meta: meta, worlds:worlds, kongs:kongs, kongupgrades:kongupgrades, extraupgrades:extraupgrades});
});

module.exports = router;

