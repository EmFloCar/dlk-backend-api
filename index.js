require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const multer = require('multer');
const app = express();


const login = require("./routes/auth.routes");
const palabra_rutas = require("./routes/palabras.routes");
const refran_rutas = require("./routes/refranes.routes");
const info_rutas = require('./routes/info.routes')
const database = require("./bin/database");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors())

app.use('/', login); //admin
app.use("/palabra", palabra_rutas);
app.use("/refran", refran_rutas);
app.use("/info", info_rutas);

app.listen(process.env.PORT || 3000, () => {
  console.log("server on");
})
