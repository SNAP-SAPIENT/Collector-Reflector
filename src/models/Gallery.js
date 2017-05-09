var mongoose = require('mongoose');
var _ = require('underscore');

var GalleryModel;

var GallerySchema = new mongoose.Schema({
  // Shoe Nickname
  name: {
    type: String,
    require: true,
    trim: true
  },
  // Path name to load images from
  url: {
    type: String,
    require: true,
    trim: true
  },
  // Shoe owner, current session user
  owner: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: 'Account'
  },
  // The brand of the shoe
  brand: {
    type: String,
    require: true,
    trim: true
  },
  // Primary color of shoe Red/Orange/Yellow/Green/Blue
  color: {
    type: String,
    require: true,
    trim: true
  },
  // Shoe style, Low/Mid/High
  styleSize: {
    type: String,
    required: true,
    trim: true
  },
  // Year the shoe was released by brand/company
  yearReleased: {
    type: Number,
    required: true,
  },
});

GallerySchema.methods.toAPI = function() {
  return {
    name: this.name,
    url: this.url,
    brand: this.brand,
    color: this.color,
    styleSize: this.styleSize,
    yearReleased: this.yearReleased
  };
};

GallerySchema.statics.findByOwner = function(ownerId, callback) {
  var search = {
    owner: mongoose.Types.ObjectId(ownerId)
  };

  return GalleryModel.find(search).select('name url brand color styleSize yearReleased').exec(callback);
};

GalleryModel = mongoose.model('Gallery', GallerySchema);

module.exports.GalleryModel = GalleryModel;
module.exports.GallerySchema = GallerySchema;






