var express = require('express');
var router = express.Router();

async function getFlickrData() {
  try {
    const response = await got('https://api.flickr.com/services/feeds/photoset.gne?set=72157623352223751&nsid=33129098@N06&lang=en-us&format=json&nojsoncallback=1');
    return JSON.parse(response.body);
    //=> '<!doctype html> ...'
  } catch (error) {
      console.log(error);
      //=> 'Internal server error ...'
  }
}

router.get('/', async function(req, res, next) {
  const data = await getFlickrData();
  console.log(data);

  res.render('index', {
    title: 'Konspire Design',
    body_class: "home",
    data: data
  });
});

const got = require('got');
 
function getFlickrData2() {
  request.get("https://api.flickr.com/services/feeds/photoset.gne?set=72157623352223751&nsid=33129098@N06&lang=en-us&format=json&nojsoncallback=1", (err, response, body) => {
    if (err) {
      return next(err);
    }
    // enduro.api.temper.render('about', JSON.parse(body))
    //   .then((output) => {
    //       res.send(output)
    // })
    // res.send({data: JSON.parse(body)});
    return JSON.parse(body); 
  });
}

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
