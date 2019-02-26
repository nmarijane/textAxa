import express from "express";
import {green} from "../common/constants";
import StockController from "../back/stock.controller";
const appRouter = express.Router();

/***********************/
/****   APP ROUTES   ***/
/***********************/

/**
 * @api {get} / Get the render of the application
 * @apiName Get
 * @apiGroup Index Page
 **/
appRouter.get('/', function(req, res) {
    // console logger for node server
    console.log(green, '[ GET ] / index page');
    res.render("index");
});

/**
 * @api {get} / Get all the stocks data
 * @apiName Get
 * @apiGroup Stock
 * @apiSuccess {stocks: []} Array of stocks
 **/
appRouter.get('/stocks', (req, res) => {
    // console logger for node server
    console.log(green, '[ GET ] /allstocks');
    StockController.getStocks(req, res);
});

/**
 * @api {get} / Update the stock by Id
 * @apiName Update
 * @apiGroup Stock
 * @apiSuccess {String} message Stock updated successfully
 **/
appRouter.put('/stocks/:id', (req, res) => {
    console.log('body', req.body);
    // console logger for node server
    console.log(green, '[ GET ] /stocks/:id');
    StockController.updateStock(req, res);
});

/**
 * @exports appRouter
 */
export default appRouter;