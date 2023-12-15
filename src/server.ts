import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";

import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage
} from "./controllers/planets.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use("/uploads", express.static("uploads"))

app.use(express.json());
app.use(morgan("dev"));


app.get("/api/planets", getAll);


app.get("/api/planets/:id", getOneById);


app.post("/api/planets", create);


app.put("/api/planets/:id", updateById);


app.delete("/api/planets/:id", deleteById);


app.post("/api/planets/:id/image", upload.single("image"), createImage)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:3000`);
});