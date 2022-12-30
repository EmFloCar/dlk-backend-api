const express = require('express');
const router = express.Router();
const Refran = require('./../models/refranes.models')


//AÑADIR NUEVOS REFRANES
router.post("/", async(req, res) => {
  const {lema, isoglosa, acto_de_habla, significado} = req.body;

  const refran_nuevo = await Refran.create({
      lema: lema,
      isoglosa: isoglosa,
      acto_de_habla: acto_de_habla,
      significado: significado,
    });
    res.send(refran_nuevo);
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
