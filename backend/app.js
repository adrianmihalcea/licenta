const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./src/routes');

const app = express();
const port = 8080;
app.use(cors());
app.use(fileUpload())

const jsonParser = bodyParser.json()

app.listen(port, () => {
    console.log('Starting up Backend on port 8080');
});

routes.initRoutes(app, jsonParser);
