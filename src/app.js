const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index.js')
const { createTunnel } = require('./helpers/tunnel')
require('dotenv').config();

const { PORT: port } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(routes);
app.listen(port, () => {
  createTunnel(port);
});
