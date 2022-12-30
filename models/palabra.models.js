const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const palabraSchema = new Schema({

  lema: String,
  informacion_gramatical: String,
  hiperonimo: String,
  hiponimo: String,
  significado: String,
  ejemplo: String,
  imagenUrl: Object, 
  isoglosa: String 

});

palabraSchema.methods.setImgUrl = function(filename){
	console.log("Entra")
	this.imagenUrl = `http://localhost:3000/public/${filename}`
}

const Palabra = mongoose.model("Palabra", palabraSchema);

module.exports = Palabra;
