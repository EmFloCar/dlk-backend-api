const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const refranSchema = new Schema({

   lema: String,
   isoglosa: String,
   acto_de_habla: String,
   significado: String,
   imagenUrl: Object
 })

refranSchema.methods.setImgUrl = function(location){
  this.imagenUrl = location
}

const Refran = mongoose.model("refran", refranSchema);

module.exports = Refran;
