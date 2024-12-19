const mongoose = require("mongoose");

const database = async () => {
  mongoose
    .connect(
      "mongodb+srv://awais:awais@cluster0.tpfm3.mongodb.net/PalmistBeauty?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Connected to MongoDB Beauty Palmist...."))
    .catch((error) => console.log(error.message));
};
module.exports = database;
