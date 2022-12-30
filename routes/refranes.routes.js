const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
var aws = require('aws-sdk')


const Refran = require('./../models/refranes.models')
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
  const {lema, isoglosa, acto_de_habla, significado} = req.body;

  const refran_nuevo = Refran({
      lema,
      isoglosa,
      acto_de_habla,
      significado,
    });

     if (req.file) {
    const {location} = req.file
    refran_nuevo.setImgUrl(location)
  }

  const guardar = await refran_nuevo.save()
  res.send(refran_nuevo);

  }catch(err){
    next(err)
  }


})

//VER LOS REFRANES AÑADIDOS
router.get('/', async(req, res) => {
  const refran = await Refran.find();
  res.json(refran);
});

//VER PALABRA POR ID
router.get('/:id', async(req, res) => {
  const refran = await Refran.findById(req.params.id);
  res.json(refran);
});

//ELIMINAR REFRAN
router.delete('/:id', async(req, res) => {
  await Refran.findByIdAndRemove(req.params.id);
  res.json("eliminada");
});

//EDITAR REFRAN
router.put('/:id', async (req, res) => {
  await Refran.findByIdAndUpdate(req.params.id, req.body)
  res.json("actualizado");
})



module.exports = router;
