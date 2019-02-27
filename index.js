import express from "express";
import nunjucks from "nunjucks";
import path from "path";
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

//define a timeout and catch the error
app.use(function (req, res, next) {
    res.setTimeout(10000, function(){
        console.log('Request has timed out.');
        res.sendStatus(408);
    });
    next();
});

// parse application/json
app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

app.use(
  express.static(path.join(__dirname, "/.public"), { maxAge: 31536000000 })
);

app.use(appRouter, errorRouter);

app.listen(1337, () => {
  console.log(`Server started ➜ http://localhost:1337`);
});
