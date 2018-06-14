'use strict';

const express = require('express');
const join = require('path').join;
const readFileSync = require('fs').readFileSync;
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'bundle');

require('zone.js/dist/zone-node');
require('reflect-metadata');
const enableProdMode = require('@angular/core').enableProdMode;
const renderModuleFactory = require('@angular/platform-server').renderModuleFactory;
const template = readFileSync(join(DIST_FOLDER, 'bundle-en', 'index.html')).toString();

enableProdMode();

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/lisa-ui/main');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

const app = express();

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'bundle-en'));
app.get('*.*', express.static(join(DIST_FOLDER, 'bundle-en')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'bundle-en', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});

/*
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
*/
