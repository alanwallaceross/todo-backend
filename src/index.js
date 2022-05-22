import "dotenv/config";
import cors from "cors";
import express from "express";
import todos from "./handlers/todos";
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = app.listen(process.env.PORT, () =>
  console.info(`App is listening on port ${process.env.PORT}!`)
);

app.get("/", (req, res) => {
  res.send("Hello Alan");
});

app.use("/todos", todos);

export default server;
