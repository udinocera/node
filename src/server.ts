import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import 'express-async-errors'

dotenv.config();

type Planet = {
    id: number,
    name: string,
  };

  type Planets = Planet[];

  let planets: Planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];

  const app = express();

  app.use(express.json());
  app.use(morgan('dev'));
  
  app.get('/planets', (req, res) => {
    res.json(planets);
  });
  
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });