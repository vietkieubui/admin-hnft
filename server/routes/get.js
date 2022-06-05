const express = require("express");
const router = express.Router();

const Store = require("../models/Store");

router.get("/stores/:category", async (req, res) => {
    try {
        const stores = await Store.find({
            categories: { $in: [req.params.category] },
        }).select("-password");
        // console.log(store);
        if (!stores)
            return res.status(400).json({
                success: false,
                message: "Store not found ",
            });
        res.json({ success: true, stores });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

module.exports = router;
