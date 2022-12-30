const mongoose = require("mongoose");

class Database{
  constructor() {
    this.connect();
  }

  async connect(){
    try {
      await mongoose.connect(
        "mongodb+srv://emiliofc:emilio@cluster0.wbdwk.mongodb.net/Diccionario?retryWrites=true&w=majority",
      { useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to database");
    } catch (e) {
      console.error(e);
    }
  }
}

exports.controller = new Database()
