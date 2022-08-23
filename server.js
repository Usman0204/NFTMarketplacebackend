require('dotenv').config();
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const cors = require('cors');
const morgan = require('morgan');
const db = require('./database/databaseConnection').conn()

// const multer = require('multer');
// const upload = multer({ dest: './uploads/'})

const port = 5001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(helmet()); // set well-known security-related HTTP headers
app.use(compression());

app.disable("x-powered-by");

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/user', require('./routes/user'));
app.use('/collection', require('./routes/collection'));
app.use('/order', require('./routes/order'));
app.use('/sale', require('./routes/sale'));
app.use('/token', require('./routes/token'));
app.use('/bid', require('./routes/bid'));

app.listen(port, () => console.log("Server Listening on Port " + port));

