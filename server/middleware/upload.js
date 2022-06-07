// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "../client/public/upload");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ev8o8.mongodb.net/hanoitoursm?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-image-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });
