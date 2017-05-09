var controllers = require('./controllers');

var router = function(app) {
  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);
  app.get('/signup', controllers.Account.signupPage);
  app.post('/signup', controllers.Account.signup);
  app.get('/logout', controllers.Account.logout);
  app.get('/maker', controllers.Domo.makerPage);
  app.post('/maker', controllers.Domo.make);
  app.get('/', controllers.Account.loginPage);
  app.get('/gallery', controllers.Gallery.galleryPage);
  app.post('/scanShoe', controllers.Gallery.scanShoe);
  app.get('/graphic', controllers.Graphic.graphicPage);
  app.get('/getGraphic', controllers.Graphic.getGraphic);
};

module.exports = router;
