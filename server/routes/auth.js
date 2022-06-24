const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const verifyTokenUser = require("../middleware/authUser");

const User = require("../models/User");
const Store = require("../models/Store");

// @route POST /auth/user/register
// @register user
// @public
router.post("/user/register", async (req, res) => {
    const { name, phone, address, password } = req.body;

    try {
        // check for existing user
        const user = await User.findOne({ phone: phone });
        if (user)
            return res.status(400).json({
                success: false,
                message: "Số điện thoại đã được sử dụng",
            });

        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            name,
            phone,
            address,
            password: hashedPassword,
        });

        // console.log(newStore);

        await newUser.save();

        // return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        return res.json({
            success: true,
            message: "Đăng ký tài khoản thành công",
            accessToken,
            newUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Đăng ký tài khoản không thành công",
        });
    }
});

// @route POST /auth/user/login
// @login user
// @public

router.post("/user/login", async (req, res) => {
    const { phone, password } = req.body;

    try {
        // Check for existing user
        const user = await User.findOne({ phone });
        if (!user)
            return res.status(400).json({
                success: false,
                message: "Tài khoản hoặc mật khẩu chưa đúng",
            });

        // Username found
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid)
            return res.status(400).json({
                success: false,
                message: "Tài khoản hoặc mật khẩu chưa đúng",
            });

        // All good
        // Return token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: "Đăng nhập thành công",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @route GET /auth/user
// @desc Check if user is logged in
// @access Public
router.get("/user", verifyTokenUser, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        // console.log(store);
        if (!user)
            return res.status(400).json({
                success: false,
                message: "Không tìm thấy người dùng",
            });
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// // @route PUT /auth/user/update
// // @desc Update user
// // @access Private
router.put("/user/:id", verifyTokenUser, async (req, res) => {
    const { name, phone, address } = req.body;

    // check for existing user
    const user = await User.findOne({
        _id: { $ne: req.params.id },
        phone: phone,
    });
    if (user)
        return res.status(400).json({
            success: false,
            message: "Số điện thoại đã được sử dụng",
        });

    try {
        let updatedUser = {
            name,
            phone,
            address,
        };
        // console.log(updatedStore);
        // console.log(req.params.id);

        const userUpdateCondition = { _id: req.params.id };

        // console.log(storeUpdateCondition);

        updatedUser = await User.findOneAndUpdate(
            userUpdateCondition,
            updatedUser,
            { new: true }
        );

        // console.log(updatedStore);

        // Store not authorised to update store or store not found
        if (!updatedUser)
            return res.status(401).json({
                success: false,
                message: "Người dùng không tồn tại",
            });

        res.json({
            success: true,
            message: "Cập nhật thành công",
            user: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

//-----------------------------------------------STORE-----------------------------------------------

// @route GET /auth/store
// @desc Check if store is logged in
// @access Public
router.get("/store", verifyToken, async (req, res) => {
    try {
        const store = await Store.findById(req.storeId).select("-password");
        // console.log(store);
        if (!store)
            return res.status(400).json({
                success: false,
                message: "Store not found ",
            });
        res.json({ success: true, store });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @route POST /auth/store/register
// @register store
// @public
router.post("/store/register", async (req, res) => {
    const {
        avatar,
        phone,
        password,
        name,
        address,
        timeOpen,
        timeClose,
        categories,
    } = req.body;

    try {
        // check for existing user
        const store = await Store.findOne({ phone: phone });
        if (store)
            return res.status(400).json({
                success: false,
                message: "Số điện thoại đã được sử dụng",
                avatar: avatar,
            });

        const hashedPassword = await argon2.hash(password);
        const newStore = new Store({
            avatar: avatar,
            phone: phone,
            password: hashedPassword,
            name: name,
            address: address,
            timeOpen: timeOpen,
            timeClose: timeClose,
            categories: categories,
        });

        // console.log(newStore);

        await newStore.save();

        // return token
        const accessToken = jwt.sign(
            { storeId: newStore._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        return res.json({
            success: true,
            message: "Đăng ký tài khoản thành công",
            accessToken,
            newStore,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Đăng ký tài khoản không thành công",
        });
    }
});

// @route POST /auth/store/login
// @login store
// @public

router.post("/store/login", async (req, res) => {
    const { phone, password } = req.body;
    // if (!username || !password)
    //     return res.status(400).json({
    //         success: false,
    //         message: "Bạn chưa nhập đầy đủ thông tin",
    //     });

    try {
        // Check for existing user
        const store = await Store.findOne({ phone });
        if (!store)
            return res.status(400).json({
                success: false,
                message: "Tài khoản hoặc mật khẩu chưa đúng",
            });

        // Username found
        const passwordValid = await argon2.verify(store.password, password);
        if (!passwordValid)
            return res.status(400).json({
                success: false,
                message: "Tài khoản hoặc mật khẩu chưa đúng",
            });

        // All good
        // Return token
        const accessToken = jwt.sign(
            { storeId: store._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: "Đăng nhập thành công",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// // @route PUT /auth/store/update
// // @desc Update store
// // @access Private
router.put("/store/:id", verifyToken, async (req, res) => {
    const { avatar, phone, name, address, timeOpen, timeClose, categories } =
        req.body;

    // check for existing user
    const store = await Store.findOne({
        _id: { $ne: req.params.id },
        phone: phone,
    });
    if (store)
        return res.status(400).json({
            success: false,
            message: "Số điện thoại đã được sử dụng",
            avatar: avatar,
        });

    try {
        let updatedStore = {
            avatar,
            phone,
            name,
            address,
            timeOpen,
            timeClose,
            categories,
        };
        // console.log(updatedStore);
        // console.log(req.params.id);

        const storeUpdateCondition = { _id: req.params.id };

        // console.log(storeUpdateCondition);

        updatedStore = await Store.findOneAndUpdate(
            storeUpdateCondition,
            updatedStore,
            { new: true }
        );

        // console.log(updatedStore);

        // Store not authorised to update store or store not found
        if (!updatedStore)
            return res.status(401).json({
                success: false,
                message: "Cửa hàng không tồn tại",
                avatar: avatar,
            });

        res.json({
            success: true,
            message: "Cập nhật cửa hàng thành công",
            store: updatedStore,
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
