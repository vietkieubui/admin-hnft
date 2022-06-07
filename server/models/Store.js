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
    timeOpen: {
        type: String,
    },
    timeClose: {
        type: String,
    },
    categories: {
        type: Array,
    },
    avatar: {
        type: String,
        // require: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("stores", StoreSchema);
