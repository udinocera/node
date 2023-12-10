import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";

import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./controllers/planets.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));


app.get("/api/planets", getAll);


app.get("/api/planets/:id", getOneById);


app.post("/api/planets", create);


app.put("/api/planets/:id", updateById);


app.delete("/api/planets/:id", deleteById);


app.listen(3000, () => {
  console.log("the server is running on http://localhost:3000");
})