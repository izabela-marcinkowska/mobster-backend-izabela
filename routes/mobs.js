var express = require("express");
var router = express.Router();
const { v4: uuidV4 } = require("uuid");

const mobs = [
  {
    id: "d7bf1bef-79fc-48bd-b555-4af84363b172",
    name: "Team-Johnie",
  },
  {
    id: "022e75db-81d9-41a3-bc36-a38890ebe0d9",
    name: "Team-Isabella",
  },
];

router.get("/", (req, res) => {
  res.status(200).json(mobs);
});

router.post("/", (req, res) => {
  const id = uuidV4();
  const { name } = req.body;
  const mobsData = {
    id,
    name,
  };
  mobs.push(mobsData);
  res.status(201).json(mobsData);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const mob = mobs.find((item) => {
    return item.id === id;
  });
  if (!mob) {
    res.status(404).send("Mob not found");
  }
  res.status(200).json(mob);
});

module.exports = router;
