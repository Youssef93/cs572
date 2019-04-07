const express = require("express");
const uid = require("uid");
const cors = require("cors");
const _ = require("lodash");
const morgan = require("morgan");
const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

const app = express();
app.use(cors());
app.use(morgan("common", { stream: accessLogStream }));

// fails if json is invalid
app.use(express.json());

let grades = [
  {
    id: uid(),
    name: "Assad Saad",
    course: "CS572",
    grade: 52
  }
];

app.get("/grades", (req, res) => {
  res.send(grades);
});

app.get("/grades/:id", (req, res) => {
  const item = _.find(grades, g => g.id === req.params.id);
  res.send(item);
});

app.post("/grades", (req, res) => {
  const newItem = req.body;
  newItem.id = uid();
  grades.push(newItem);
  res.send(newItem);
});

app.delete("/grades/:id", (req, res) => {
  grades = _.filter((grades), g => g.id !== req.params.id);
  res.send(true);
});

app.put("/grades/:id", (req, res) => {
  grades = _.map(grades, g => {
    if (g.id !== req.params.id) return g;
    const updated = _.cloneDeep(req.body);
    updated.id = req.params.id;
    return updated;
  });

  res.send(true);
});

app.listen(3000);
