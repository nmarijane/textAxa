import express from "express";
import nunjucks from "nunjucks";
import path from "path";
import 'babel-polyfill';
import './app/routes';
import appRouter from "./app/routes";

const app = express();

app.set("views", path.join(__dirname, "/front"));
app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "./front"), {
  autoescape: true,
  express: app
});

app.use(
  express.static(path.join(__dirname, "/.public"), { maxAge: 31536000000 })
);

app.use(appRouter);

app.listen(1337, () => {
  console.log(`Server started ➜ http://localhost:1337`);
});
