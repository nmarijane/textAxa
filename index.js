import express from "express";
import nunjucks from "nunjucks";
import path from "path";
import 'babel-polyfill';
import './app/routes';
import appRouter from "./app/routes";
import errorRouter from "./app/error_routes";
import bodyParser from "body-parser";

const app = express();

app.set("views", path.join(__dirname, "/front"));
app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "./front"), {
  autoescape: true,
  express: app
});

// parse application/json
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.set('Access-Control-Allow-Credentials', true);
    next();
});

//define a timeout and catch the error
app.use(function (req, res, next) {
    res.setTimeout(10000, function(){
        console.log('Request has timed out.');
        res.sendStatus(408);
    });
    next();
});

app.use(
  express.static(path.join(__dirname, "/.public"), { maxAge: 31536000000 })
);

app.use(appRouter, errorRouter);

app.listen(1337, () => {
  console.log(`Server started ➜ http://localhost:1337`);
});
