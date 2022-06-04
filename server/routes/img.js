const express = require("express");
const router = express.Router();
let path = require("path");
const Images = require("../models/ImgModel");
const upload = require("../constants/upload");
const Store = require("../models/Store");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

// console.log(upload.storage.getFilename());

router.post("/add", upload.single("photo"), async (req, res) => {
    const filePath = `http://localhost:3000/upload/${req.file.filename}`;
    res.end(filePath);
});

router.post("/delete", async (req, res) => {
    const { path } = req.body;
    // console.log(path);

    const pathTrue =
        "../client/public" + path.replace("http://localhost:3000", "");
    // console.log(pathTrue);

    fs.unlink(pathTrue, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
});

module.exports = router;
