const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    phone: {
        type: String,
        require: true,
        unique: true,
    },
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        default: "",
    },
    listFavourite: {
        type: Array,
        default: [],
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("users", UserSchema);
