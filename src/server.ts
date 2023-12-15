import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import 'express-async-errors';
import Joi from 'joi';
import multer from "multer"
import {getAll, getOneById, create, updateById, deleteById, createImage} from "./controllers/planets"

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const planetSchema = Joi.object({
  name: Joi.string().required(),
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})
const upload = multer({ storage })

const validatePlanet = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

app.get('/api/planets', getAll );

app.get('/api/planets/:id', getOneById);

app.post('/api/planets', validatePlanet, create);

app.put('/api/planets/:id', validatePlanet, updateById);

app.delete('/api/planets/:id', deleteById);

app.post("/api/planets/:id/image", upload.single("image"), createImage)

app.use("/uploads", express.static("uploads"))
app.use("/static", express.static("static"))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});