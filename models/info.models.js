const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const infoSchema = new Schema({

   lema: String,
   significado: String,
   imagenUrl: Object
 })

 infoSchema.methods.setImgUrl = function(location){
  this.imagenUrl = location
}

const Info = mongoose.model("info", infoSchema);

module.exports = Info;
