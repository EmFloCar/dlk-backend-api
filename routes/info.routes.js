const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
var aws = require('aws-sdk')


const Info = require('./../models/info.models')
require('dotenv').config();

//CONFIG S3
var s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_REFRAN,
  secretAccessKey: process.env.S3_SECRET_KEY_REFRAN,
})

var upload = multer({
  storage: multerS3({
    s3: s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: process.env.S3_BUCKED_NAME_REFRAN,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})


//AÑADIR NUEVOS REFRANES
router.post("/", upload.single('file'), async(req, res, next) => {
  try{
  const {lema, significado} = req.body;

  const newInfo = Info({
      lema,
      significado,
    });

     if (req.file) {
    const {location} = req.file
    newInfo.setImgUrl(location)
  }

  const guardar = await newInfo.save()
  res.send(newInfo);

  }catch(err){
    next(err)
  }


})

//VER LOS REFRANES AÑADIDOS
router.get('/', async(req, res) => {
  const info = await Info.find();
  res.json(info);
});

//VER PALABRA POR ID
router.get('/:id', async(req, res) => {
  const info = await Info.findById(req.params.id);
  res.json(info);
});

//ELIMINAR REFRAN
router.delete('/:id', async(req, res) => {
  await Info.findByIdAndRemove(req.params.id);
  res.json("eliminada");
});

//EDITAR REFRAN SIN IMAGEN
router.put('/:id', async (req, res) => {
  await Info.findByIdAndUpdate(req.params.id, req.body)
  res.json("actualizado");
})

//EDITAR REFRAN CON IMAGEN
router.put('withImage/:id', upload.single('file'), async (req, res, next) => {
  try{
    const {lema, imagenUrl, significado} = req.body;
  
    const editedInfo = {
      lema,
      imagenUrl,
      significado
    }
    if (req.file) {
      const {location} = req.file
      editedInfo.imagenUrl = location
    }
  
    await Info.findByIdAndUpdate(req.params.id, editedInfo)
    res.json("actualizado");
  }catch(err){
    next(err)
  }
})

module.exports = router;
