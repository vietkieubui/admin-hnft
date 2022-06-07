const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Foods = require("../models/Foods");

// get food with web
router.get("/", verifyToken, async (req, res) => {
    try {
        const foods = await Foods.find({ store: req.storeId });
        res.json({ success: true, foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// get food with app
router.get("/:storeId", async (req, res) => {
    try {
        const foods = await Foods.find({ store: req.params.storeId });
        res.json({ success: true, foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.post("/add", verifyToken, async (req, res) => {
    const { name, image, price } = req.body;
    try {
        // Check for existing user
        const food = await Foods.findOne({ store: req.storeId, name });
        if (food)
            return res.status(400).json({
                success: false,
                message: "Tên món đã tồn tại",
                foods: req.body,
            });

        // All good
        const newFood = new Foods({
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

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        const foodDeleteCondition = { _id: req.params.id, store: req.storeId };
        const deletedFood = await Foods.findOneAndDelete(foodDeleteCondition);

        // User not authorised or post not found
        if (!deletedFood)
            return res.status(401).json({
                success: false,
                message: "Food not found or Store not authorised",
            });

        res.json({ success: true, food: deletedFood });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.put("/update/:id", verifyToken, async (req, res) => {
    const { name, image, price, status } = req.body;
    // check for existing user
    const food = await Foods.findOne({
        _id: { $ne: req.params.id },
        name,
    });
    if (food)
        return res.status(400).json({
            success: false,
            message: "Tên món ăn đã được sử dụng",
            foods: req.body,
        });

    try {
        let updatedFood = {
            name,
            image,
            price,
            status,
        };

        const foodUpdateCondition = { _id: req.params.id, store: req.storeId };

        updatedFood = await Foods.findOneAndUpdate(
            foodUpdateCondition,
            updatedFood,
            { new: true }
        );

        // User not authorised to update post or post not found
        if (!updatedFood)
            return res.status(401).json({
                success: false,
                message: "Food not found or Store not authorised",
            });

        res.json({
            success: true,
            message: "Cập nhật món thành công",
            food: updatedFood,
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
