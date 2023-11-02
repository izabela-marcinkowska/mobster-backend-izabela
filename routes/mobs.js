var express = require("express");
var router = express.Router();
const { v4: uuidV4 } = require("uuid");

const mobs = [
  {
    id: "d7bf1bef-79fc-48bd-b555-4af84363b172",
    name: "Team-Johnie",
    members: [
      {
        mobId: "d7bf1bef-79fc-48bd-b555-4af84363b172",
        name: "Johnie",
        memberId: "f0f800ac-8d6a-4c94-98fa-571d523d678a",
      },
      {
        mobId: "d7bf1bef-79fc-48bd-b555-4af84363b172",
        name: "Viktor",
        memberId: "dff2811e-cd0c-45a0-afe2-3ab953a56f24",
      },
    ],
  },
  {
    id: "022e75db-81d9-41a3-bc36-a38890ebe0d9",
    name: "Team-Isabella",
    members: [
      {
        mobId: "022e75db-81d9-41a3-bc36-a38890ebe0d9",
        name: "Isabella",
        memberId: "206d5dc4-46b2-4449-a7e5-1f3b4070a3e2",
      },
    ],
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

router.get("/:mobId", (req, res) => {
  const { mobId } = req.params;
  const mob = mobs.find((item) => {
    return item.id === mobId;
  });
  if (!mob) {
    res.status(404).send("Mob not found");
  }
  res.status(200).json(mob);
});

router.post("/:mobId/members", (req, res) => {
  const memberId = uuidV4();
  const { mobId } = req.params;
  const { name } = req.body;
  const mob = mobs.find((item) => {
    return item.id === mobId;
  });
  if (!mob) {
    res.status(403).send("No existing mob");
  }
  const mobMember = {
    mobId,
    name,
    memberId,
  };
  mob.members.push(mobMember);
  res.status(201).json(mobMember);
});

router.get("/:mobId/members/:memberId", (req, res) => {
  const { mobId, memberId } = req.params;
  const mob = mobs.find((item) => {
    return item.id === mobId;
  });
  if (!mob) {
    res.status(404).send("No existing mob");
  }
  const member = mob.members.find((item) => {
    return item.memberId === memberId;
  });
  if (!member) {
    res.status(404).send("Not existing mob member");
  }
  res.status(200).json(member);
});

module.exports = router;
