const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Food = require("../models/Foods");

// @route POST /auth/store/login
// @login store
// @public

router.post("/add", verifyToken, async (req, res) => {
    const { name, image, price } = req.body;

    try {
        // Check for existing user
        const food = await Food.findOne({ name });
        if (food)
            return res.status(400).json({
                success: false,
                message: "Tên món đã tồn tại",
            });

        // All good
        const newFood = new Food({
            name,
            image,
            price,
            status: "CÒN HÀNG",
            store: req.storeId,
        });

        await newFood.save();

        res.json({
            success: true,
            message: "Thêm món ăn thành công",
            food: newFood,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

module.exports = router;
