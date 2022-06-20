const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    console.log("req: ", req.header);
    console.log("token: ", token);

    if (!token)
        return res
            .status(401)
            .json({ success: false, message: "Không tìm thấy Access Token" });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decoded);
        req.userId = decoded.userId;
        // console.log(decoded.storeId);
        next();
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ success: false, message: "Invalid token" });
    }
};

module.exports = verifyToken;
