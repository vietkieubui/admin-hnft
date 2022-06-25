const express = require("express");
const router = express.Router();
const verifyTokenUser = require("../middleware/authUser");
const Order = require("../models/Order");

// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.userId }).populate("user", [
//       "username",
//     ]);
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// router.post("/", verifyToken, async (req, res) => {
//   const { list, price, ship, totalPrice } = req.body;

//   if (!list) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Chưa có danh sách món ăn" });
//   } else if (!price) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Chưa có giá của đơn hàng" });
//   } else if (!ship) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Chưa có tiền ship" });
//   }

//   try {
//     const newOrder = new Order({
//       list,
//       price,
//       totalPrice,
//       ship,
//       status: "PENDING",
//       user: req.userId,
//     });

//     await newOrder.save();
//     res.json({ success: true, message: "Happy order!", order: newOrder });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

router.post("/add", verifyTokenUser, async (req, res) => {
    const { restaurant, foods, totalPrice } = req.body;
    try {
        const newOrder = new Order({
            restaurant,
            foods,
            totalPrice,
            status: "CHƯA XÁC NHẬN",
            user: req.userId,
        });

        await newOrder.save();

        res.json({
            success: true,
            message: "Đặt hàng thành công",
            order: newOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.get("/getOrderApp", verifyTokenUser, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId })
            .populate("restaurant")
            .exec();

        if (!orders)
            return res.status(400).json({
                success: false,
                message: "Không tìm thấy đơn hàng",
            });

        res.json({ success: true, orders: orders });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

module.exports = router;
