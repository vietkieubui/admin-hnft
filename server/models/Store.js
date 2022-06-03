const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    phone: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        // require: true,
    },
    address: {
        type: String,
        // require: true,
    },
    categories: {
        type: Array,
    },
    avatar: {
        type: String,
        // require: true,
    },
    foods: {
        type: Array,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("stores", StoreSchema);
