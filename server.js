const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');
const FRAGMENT = 'scg-masterminds-v3.1.html';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
  '.xml':  'application/xml',
  '.txt':  'text/plain; charset=utf-8',
};

/* The quiz lives in an embeddable fragment (no <head>) so it can be pasted
   into scgtuitions.co.uk. When we serve it as a standalone page we wrap it in
   a full document, otherwise search engines and link previews get no title,
   description or image at all. */
const SITE = process.env.SITE_URL || 'https://scgmasterminds.co.uk';
const TITLE = 'SCG Masterminds | 11+, English & Maths Practice for Years 1-3';
const DESC = 'Tutor-built English and maths practice for Years 1, 2 and 3. Read-aloud comprehensions, real grammar and punctuation practice, timed 11+ FSCE mock papers and instant marking, with a full score report emailed to you. Start free, then from GBP 1.50 a month.';

function wrap(fragment) {
  return '<!doctype html>\n' +
'<html lang="en-GB">\n' +
'<head>\n' +
'<meta charset="utf-8">\n' +
'<meta name="viewport" content="width=device-width,initial-scale=1">\n' +
'<title>' + TITLE + '</title>\n' +
'<meta name="description" content="' + DESC + '">\n' +
'<link rel="canonical" href="' + SITE + '/">\n' +
'<meta name="robots" content="index,follow">\n' +
'<meta name="theme-color" content="#1a2870">\n' +
'<link rel="icon" href="/scg-logo.svg" type="image/svg+xml">\n' +
'<link rel="apple-touch-icon" href="/masterminds-logo.jpeg">\n' +
'<meta property="og:type" content="website">\n' +
'<meta property="og:site_name" content="SCG Masterminds">\n' +
'<meta property="og:title" content="' + TITLE + '">\n' +
'<meta property="og:description" content="' + DESC + '">\n' +
'<meta property="og:url" content="' + SITE + '/">\n' +
'<meta property="og:image" content="' + SITE + '/masterminds-picture.jpeg">\n' +
'<meta property="og:locale" content="en_GB">\n' +
'<meta name="twitter:card" content="summary_large_image">\n' +
'<meta name="twitter:title" content="' + TITLE + '">\n' +
'<meta name="twitter:description" content="' + DESC + '">\n' +
'<meta name="twitter:image" content="' + SITE + '/masterminds-picture.jpeg">\n' +
'<script type="application/ld+json">\n' + JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'SCG Masterminds',
  description: DESC,
  url: SITE + '/',
  parentOrganization: { '@type': 'Organization', name: 'SCG Tuitions' },
  email: 'info@scgtuitions.co.uk',
  areaServed: 'GB',
  makesOffer: [
    { '@type': 'Offer', name: 'Free taster', price: '0', priceCurrency: 'GBP' },
    { '@type': 'Offer', name: 'English', price: '1.50', priceCurrency: 'GBP' },
    { '@type': 'Offer', name: 'Maths', price: '1.50', priceCurrency: 'GBP' },
    { '@type': 'Offer', name: 'English + Maths', price: '2.00', priceCurrency: 'GBP' }
  ]
}, null, 2) + '\n</script>\n' +
'</head>\n' +
'<body style="margin:0">\n' + fragment + '\n</body>\n</html>';
}

function send(res, code, type, body) {
  res.writeHead(code, { 'Content-Type': type });
  res.end(body);
}

http.createServer(function(req, res) {
  var urlPath = req.url.split('?')[0];

  if (urlPath === '/robots.txt') {
    return send(res, 200, MIME['.txt'],
      'User-agent: *\nAllow: /\nSitemap: ' + SITE + '/sitemap.xml\n');
  }
  if (urlPath === '/sitemap.xml') {
    var urls = ['/', '/privacy.html', '/terms.html'];
    return send(res, 200, MIME['.xml'],
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls.map(function (u) { return '  <url><loc>' + SITE + u + '</loc></url>'; }).join('\n') +
      '\n</urlset>\n');
  }

  var wrapIt = (urlPath === '/' || urlPath === '' || urlPath === '/' + FRAGMENT);
  if (urlPath === '/' || urlPath === '') urlPath = '/' + FRAGMENT;

  var filePath = path.join(PUBLIC, urlPath);

  // Prevent path traversal
  if (filePath.indexOf(PUBLIC) !== 0) {
    return send(res, 403, 'text/plain', 'Forbidden');
  }

  fs.readFile(filePath, function (err, data) {
    if (err) return send(res, 404, 'text/plain', 'Not found');
    if (wrapIt) return send(res, 200, MIME['.html'], wrap(data.toString('utf8')));
    var ext = path.extname(filePath);
    send(res, 200, MIME[ext] || 'application/octet-stream', data);
  });
}).listen(PORT, '0.0.0.0', function () {
  console.log('SCG Masterminds running on port ' + PORT);
});
