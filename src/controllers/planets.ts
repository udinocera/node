import { Request, Response } from "express";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/planets");

const setupDb = async () => {
  await db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets (
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT
    );
  `);

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);

  const planets = await db.many(`SELECT * FROM planets;`);
};
setupDb();

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  res.json(planets);
};

const getOneById = async (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id, 10);
  const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1`, planetId);
  res.json(planet);
};

const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newPlanet = { name };
  await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
  res.status(201).json({ msg: "Planet created successfully" });
};

const updateById = async (req: Request, res: Response) => {
  const {id} = req.params
  const {name} = req.body
  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])
  res.json({ msg: "Planet updated successfully" });
};

const deleteById = async (req: Request, res: Response) => {
  const planetId = req.params.id;
  await db.none(`DELETE FROM planets WHERE id=$1`, Number(planetId))
  res.json({ msg: "Planet deleted successfully" });
};

const createImage = async (req: Request, res: Response) => {
  const {id} = req.params
  const fileName = req.file?.path
  if (fileName) {
    db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName])
    res.status(201).json({msg: "Planet image uploaded successfully."})
  } else {
    res.status(400).json({msg: "Planet image failed to uploaded."})
  }
}

export { getAll, getOneById, create, updateById, deleteById, createImage };