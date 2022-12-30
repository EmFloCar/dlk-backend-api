const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
var aws = require('aws-sdk')

const Palabra = require('./../models/palabra.models');
require('dotenv').config();


//CONFIG S3
var s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
})

var upload = multer({
  storage: multerS3({
    s3: s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: process.env.S3_BUCKED_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})


//AÑADIR NUEVAS PALABRAS
router.post("/", upload.single('file'), async(req, res, next) => {
  try{
  const { lema, informacion_gramatical, hiperonimo, etimologia, significado, ejemplo, imagenUrl, isoglosa } = req.body;

  const palabra_nueva = Palabra({
      lema,
      informacion_gramatical,
      hiperonimo,
      etimologia,
      significado,
      ejemplo,
      imagenUrl,
      isoglosa,
    });

  if (req.file) {
    const {location} = req.file
    palabra_nueva.setImgUrl(location)
  }

  const guardar = await palabra_nueva.save()
  console.log(palabra_nueva)
    res.send(palabra_nueva);

  }catch (err) {
    next(err);
  }
})

//VER TODAS LAS PALABRAS AÑADIDAS
router.get('/', async(req, res) => {
  const palabras = await Palabra.find();
  res.json(palabras);
});

//VER PALABRA POR ID
router.get('/:id', async(req, res) => {
  const palabra = await Palabra.findById(req.params.id);
  res.json(palabra);
});

//ELIMINAR PALABRAS
router.delete('/:id', async(req, res) => {
  await Palabra.findByIdAndRemove(req.params.id);
  res.json("eliminada");
});

//EDITAR PALABRAS
router.put('/:id', async (req, res) => {
  await Palabra.findByIdAndUpdate(req.params.id, req.body)
  res.json("actualizado");
})


module.exports = router;
