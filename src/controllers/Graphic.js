var _ = require('underscore');
var models = require('../models');
var PythonShell = require('python-shell');

var Gallery = models.Gallery;

var graphicPage = function(req, res) {
  Gallery.GalleryModel.findByOwner(req.session.account._id, function(err, shoesInfo) {
    if(err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred on load.' });
    }
    res.render('graphic', { shoes: shoesInfo });
  });
};

var getGraphic = function(req, res) {
  Gallery.GalleryModel.findByOwner(req.session.account._id, function(err, shoesInfo) {
    if(err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred on load.' });
    }
    res.json({ shoes: shoesInfo });
  });
};

module.exports.graphicPage = graphicPage;
module.exports.getGraphic = getGraphic;