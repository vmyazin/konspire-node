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
  const config = req.config;
  res.render('index', {
    title: 'Konspire Design',
    body_class: "home",
    config: config
  });
});

router.get('/about', async (req, res, next) => {
  const data = await getFlickrData();
  const config = req.config;

  res.render('about', {
    title: 'About Konspire Design',
    body_class: "about",
    data: data,
    config: config
  });
});

router.get('/portfolio', (req, res) => {
  const config = req.config;

  res.render('portfolio', {
    title: 'Portfolio Konspire Design',
    body_class: "portfolio",
    config: config
  });
});

router.get('/contact', (req, res) => {
  const config = req.config;

  res.render('contact', {
    title: 'Contact Konspire Design',
    body_class: "contact",
    config: config
  });
});

router.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: \nSitemap: http://www.konspiredesign.com/sitemap/sitemap.xml");
});

router.get('/index.php', (req, res) => { res.redirect(301, '/'); });
router.get('/a/', (req, res) => { res.redirect(301, '/'); });
router.get('/about.php', (req, res) => { res.redirect(301, '/about'); });
router.get('/*/about.php', (req, res) => { res.redirect(301, '/about'); });
router.get('/portfolio.php', (req, res) => { res.redirect(301, '/portfolio'); });
router.get('/*/portfolio.php', (req, res) => { res.redirect(301, '/portfolio'); });
router.get('/contact.php', (req, res) => { res.redirect(301, '/contact'); });
router.get('/*/contact.php', (req, res) => { res.redirect(301, '/contact'); });

router.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www/) !== null ) {
    res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
  } else {
    next();     
  }
})

module.exports = router;
