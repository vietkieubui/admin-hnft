var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var imageSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  photo: {
    type: String,
  },

  birthdate: {
    type: String,
  },
});

//Image is a model which has a schema imageSchema

const Images = mongoose.model("images", imageSchema);

module.exports = Images;
