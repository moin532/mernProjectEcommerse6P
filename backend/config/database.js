const mongoose = require("mongoose");
// mongodb+srv://moinmern:moin@9606@cluster0.dcrtwb1.mongodb.net/ecomsixpack?retryWrites=true&w=majority
//mongodb://0.0.0.0:27017/Ecommerse
const url = process.env.DB_URI

const connectDatabase = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:false
      })
      .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
      });
  };
  
  module.exports = connectDatabase;
  