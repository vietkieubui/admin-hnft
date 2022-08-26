require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const cors = require("cors");
const upload = require("./constants/upload");
const imagesRouter = require("./routes/img");
const ordersRouter = require("./routes/orders");
const foodsRouter = require("./routes/foods");
const getRouter = require("./routes/get");
const Grid = require("gridfs-stream");

const connectdb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ev8o8.mongodb.net/hanoitoursm?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectdb();

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  });

  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("ADMIN HNFT API"));
app.use("/auth", authRouter);
app.use("/images", imagesRouter);
app.use("/orders", ordersRouter);
app.use("/foods", foodsRouter);

app.use("/get", getRouter);

// media routes
app.get("/images/:filename", async (req, res) => {
  console.log("filename: ", req.params.filename);
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    console.log("file: ", file);

    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    res.send(`not found: ${error}`);
  }
});

app.delete("/images/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

// app.get("/", (req, res) => {
//   ImgModel.find({}, (err, items) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("An error occurred", err);
//     } else {
//       res.render("imagesPage", { items: items });
//     }
//   });
// });

// app.post("/", upload.single("image"), (req, res, next) => {
//   const obj = {
//     name: req.body.name,
//     desc: req.body.desc,
//     img: {
//       data: fs.readFileSync(
//         path.join(__dirname + "/uploads/" + req.file.filename)
//       ),
//       contentType: "image/png",
//     },
//   };

//   ImgModel.create(obj, (err, item) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect("/");
//     }
//   });
// });

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
