const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const refranSchema = new Schema({

   lema: String,
   isoglosa: String,
   acto_de_habla: String,
   significado: String
 })

const Refran = mongoose.model("refran", refranSchema);

module.exports = Refran;
