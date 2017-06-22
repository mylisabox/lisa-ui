'use strict';

const express = require('express');
const server = express();
const supportedLanguage = ['en', 'fr'];

for (let language of supportedLanguage) {
  server.use('/', express.static(__dirname + `/bundle/bundle-${language}`));
}

server.get('*', function (req, res) {
  let lang = req.acceptsLanguages('en', 'en-US', 'en-UK', 'fr', 'fr-FR');
  if (lang) {
    lang = lang.substr(0, 2);
  }
  else {
    lang = 'en';
  }

  if (req.query.lang && supportedLanguage.indexOf(req.query.lang) !== -1) {
    lang = req.query.lang;
  }

  res.sendfile(`bundle/bundle-${lang}/index.html`);
});

server.listen(4200);
