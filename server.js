'use strict';

const express = require('express');
const server = express();
server.use('/', express.static(__dirname + '/bundle'));
server.get('*', function (req, res) {
  res.sendfile('bundle/index.html');
});
server.listen(4200);
