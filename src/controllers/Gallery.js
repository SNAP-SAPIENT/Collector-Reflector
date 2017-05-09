var _ = require('underscore');
var models = require('../models');
var PythonShell = require('python-shell');

var Gallery = models.Gallery;

var galleryPage = function(req, res) {
  Gallery.GalleryModel.findByOwner(req.session.account._id, function(err, shoesInfo) {
    if(err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred on load.' });
    }
    res.render('gallery', { shoes: shoesInfo });
  });
};

var scanShoe = function(req, res) {
  // To get filepath, need message
  var shell = new PythonShell('StepTest1.py', { mode: 'text', scriptPath: '/' + __dirname });
  var url = '';
  shell.send(req.body.name);
  // Set file directory for save
  shell.on('message', function(message) {
    url = message;
  });
  // Save Shoe to Database when done
  shell.end(function (err) {
    // Make variable for database
    var shoeData = {
      name: req.body.name,
      url: url,
      owner: req.session.account._id,
      brand: req.body.brand,
      color: req.body.color,
      styleSize: req.body.styleSize,
      yearReleased: req.body.yearReleased
    };
    // Make new database model from data
    var newGallery = new Gallery.GalleryModel(shoeData);
    // Save model to database
    newGallery.save(function(err) {
      if(err) {
        console.log(err);
        return res.status(400).json({ error: 'An error has occurred upon saving.' });
      }
      res.json({ redirect: '/gallery' });
    });
  });
};

module.exports.galleryPage = galleryPage;
module.exports.scanShoe = scanShoe;