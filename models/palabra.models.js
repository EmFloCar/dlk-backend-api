const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const palabraSchema = new Schema({

  lema: String,
  informacion_gramatical: String,
  hiperonimo: String,
  etimologia: String,
  significado: String,
  ejemplo: String,
  imagenUrl: Object, 
  isoglosa: String 

});

palabraSchema.methods.setImgUrl = function(location){
	this.imagenUrl = location
}

const Palabra = mongoose.model("Palabra", palabraSchema);

module.exports = Palabra;
