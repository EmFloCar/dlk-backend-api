require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const multer = require('multer');

const palabra_rutas = require("./routes/palabras.routes");
const refran_rutas = require("./routes/refranes.routes");
const database = require("./bin/database");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors())

app.use("/palabra", palabra_rutas);
app.use("/refran", refran_rutas);

app.listen(process.env.PORT || 3000, () => {
  console.log("server on");
})
