const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodsSchema = new Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["CÒN HÀNG", "HẾT HÀNG"],
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: "stores",
    },
});

module.exports = mongoose.model("foods", FoodsSchema);
