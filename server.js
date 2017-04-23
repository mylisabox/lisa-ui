'use strict';

const express = require('express');
const server = express();
server.use('/', express.static(__dirname + '/bundle'));
server.listen(4200);
