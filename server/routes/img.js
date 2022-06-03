const express = require("express");
const router = express.Router();
let path = require("path");
const Images = require("../models/ImgModel");
const upload = require("../constants/upload");

router.post("/add", upload.single("photo"), async (req, res) => {
    const { name, birthdate, photo } = req.body;

    try {
        const newImg = new Images({
            name,
            birthdate,
            photo,
        });

        await newImg.save();

        return res.json("added");
    } catch (error) {
        console.log(err);
        req.status(400).json("Error: " + err);
    }
});

module.exports = router;
