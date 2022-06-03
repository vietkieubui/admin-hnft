const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  list: {
    type: [Object],
  },
  price: {
    type: String,
    required: true,
  },
  ship: {
    type: String,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["DONE", "PENDING", "SHIPPING"],
  },
  rate: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("orders", OrderSchema);
