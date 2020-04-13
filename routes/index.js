var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Konspire Design',
    body_class: "home"
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Konspire Design',
    body_class: "about"
  });
});

router.get('/portfolio', (req, res) => {
  res.render('portfolio', {
    title: 'Portfolio Konspire Design',
    body_class: "portfolio"
  });
});

module.exports = router;
