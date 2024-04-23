import Express from "express";
import dotenv from "dotenv";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import connectMongo from "../Database/Connection.js";
import cors from "cors";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

const app = Express();
app.use(Express.json());
app.use(
  Express.urlencoded({
    extended: true,
  })
);

app.set("trust proxy", true);

connectMongo();

app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  if ((req.headers["x-forwarded-proto"] || "").endsWith("http"))
    res.redirect(`https://${req.headers.host}${req.url}`);
  else next();
});

import * as Routers from "./Routers/index.js";
app.use("/", Routers.indexRouter);
app.use("/login", Routers.loginRouter);
app.use("/ticket", Routers.ticketRouter);
app.use("/user", Routers.userRouter);
app.use("/notifaction", Routers.notificationRouter);

app.use((req, res, next) => {
  return res.redirect("/");
});

export { app };
