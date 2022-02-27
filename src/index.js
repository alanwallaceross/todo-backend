import "dotenv/config";
import cors from "cors";
import express from "express";
import { printMessage } from "./consolling";

const app = express();

app.use(cors());
printMessage("Hello World");
printMessage(process.env.SECRET);

app.get("/", (req, res) => {
  res.send("Hello Alan");
});

app.listen(process.env.PORT, () =>
  console.log(`App is listening on port ${process.env.PORT}!`)
);
