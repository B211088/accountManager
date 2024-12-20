import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import accounts from "./routers/accounts.router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cron from "node-cron";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const URI = process.env.DATABASE_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());
app.use("/accounts", accounts);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    cb(null, `${formattedDate}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).send({ message: "Upload thành công!", file: req.file });
  } catch (error) {
    res.status(500).send({ message: "Lỗi upload file", error });
  }
});

app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send({ message: "File không tồn tại!" });
  }
});

app.get("/files", (req, res) => {
  const uploadDir = path.join(__dirname, "uploads");

  console.log("Upload directory path:", uploadDir);

  if (!fs.existsSync(uploadDir)) {
    return res.status(404).send({ message: "Thư mục uploads không tồn tại." });
  }

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Lỗi khi đọc thư mục", error: err });
    }
    res.status(200).send(files);
  });
});

app.get("/ping", (req, res) => {
  res.status(200).send("Ping thành công!");
});

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database: ", err);
  });

cron.schedule("*/1 * * * *", async () => {
  try {
    const response = await axios.get(`http://localhost:${PORT}/ping`);
    console.log("Ping tự gửi thành công:", response.status);
  } catch (error) {
    console.error("Ping tự gửi thất bại:", error.message);
  }
});
