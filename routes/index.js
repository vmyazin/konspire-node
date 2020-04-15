let express = require('express');
let router = express.Router();
const got = require('got');

async function getFlickrData() {
  try {
    const response = await got('https://api.flickr.com/services/feeds/photoset.gne?set=72157623352223751&nsid=33129098@N06&lang=en-us&format=json&nojsoncallback=1');
    return JSON.parse(response.body);
  } catch (error) {
    console.log(error);
  }
}

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Konspire Design',
    body_class: "home"
  });
});

function getFlickrData2() {
  request.get("https://api.flickr.com/services/feeds/photoset.gne?set=72157623352223751&nsid=33129098@N06&lang=en-us&format=json&nojsoncallback=1", (err, response, body) => {
    if (err) {
      return next(err);
    }
    return JSON.parse(body); 
  });
}

router.get('/about', async (req, res, next) => {
  const data = await getFlickrData();

  res.render('about', {
    title: 'About Konspire Design',
    body_class: "about",
    data: data
  });
});

router.get('/portfolio', (req, res) => {
  res.render('portfolio', {
    title: 'Portfolio Konspire Design',
    body_class: "portfolio"
  });
});

router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Konspire Design',
    body_class: "contact"
  });
});

router.get('/index.php', (req, res) => { res.redirect(301, '/'); });
router.get('/about.php', (req, res) => { res.redirect(301, '/about'); });
router.get('/portfolio.php', (req, res) => { res.redirect(301, '/portfolio'); });
router.get('/contact.php', (req, res) => { res.redirect(301, '/contact'); });

module.exports = router;
