const express = require("express");
const router = express.Router();
let path = require("path");
const Images = require("../models/ImgModel");
const upload = require("../constants/upload");
const Store = require("../models/Store");

// console.log(upload.storage.getFilename());

router.post("/add", upload.single("photo"), async (req, res) => {
    // const { name, birthdate, photo } = req.body;
    try {
        const filePath = `http://localhost:3000/upload/${req.file.filename}`;
        // let updatedStore = {
        //     avatar: filePath,
        // };

        // const storeUpdateCondition = { _id: req.params.id };

        // updatedStore = await Store.findOneAndUpdate(
        //     storeUpdateCondition,
        //     updatedStore,
        //     { new: true }
        // );

        // // Store not authorised to update store or store not found
        // if (!updatedStore)
        //     return res.status(401).json({
        //         success: false,
        //         message: "Cửa hàng không tồn tại",
        //     });

        // res.json({
        //     success: true,
        //     message: "Cập nhật cửa hàng thành công",
        //     store: updatedStore,
        // });

        // const newImg = new Images({
        //     name,
        //     birthdate,
        //     photo,
        // });

        // await newImg.save();
        // const filePath = `http://localhost:3000/upload/${req.file.filename}`;
        res.json({
            success: true,
            message: "upload avatar cửa hàng thành công",
            avatar: filePath,
        });
        // return res.json(filePath);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "upload avatar không thành công",
        });
    }
});

module.exports = router;
