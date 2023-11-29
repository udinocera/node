import { Request, Response } from "express";

type Planet = {
  id: number;
  name: string;
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

const getAll = (req: Request, res: Response) => {
  res.json(planets);
};


const getOneById = (req: Request, res: Response) => {
    const planetId = parseInt(req.params.id, 10);
    const planet = planets.find((p) => p.id === planetId);
    if (!planet) {
      return res.status(404).json({ error: "Pianeta non trovato" });
    }
    res.json(planet);
}

const create = (req: Request, res: Response) => {
  const newPlanet: Planet = req.body;
  planets.push(newPlanet);
  res.status(201).json({ msg: "Pianeta creato" });
};

const updateById = (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id, 10);
  const planetIndex = planets.findIndex((p) => p.id === planetId);
  if (planetIndex === -1) {
    return res.status(404).json({ error: "Pianeta non trovato" });
  }
  planets[planetIndex] = req.body;
  res.json({ msg: "Planet updated successfully" });
};

const deleteById = (req: Request, res: Response) => {
  const planetId = req.params.id;
  planets = planets.filter((planet) => String(planet.id) !== planetId);
  res.json({ msg: "Pianeta eliminato" });
};


export {getAll, getOneById, create, updateById, deleteById}