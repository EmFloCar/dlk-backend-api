const mongoose = require("mongoose");

class Database{
  constructor() {
    this.connect();
  }

  async connect(){
    try {
      await mongoose.connect(
        process.env.DB,
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
