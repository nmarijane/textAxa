import express from "express";
import {green} from "../common/constants";
import {getStocks, updateStock} from "../back/stock.controller";
import {stocksCacheId, memCache, cacheMiddleware} from "../back/cache.service";

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
// cacheMiddleware is used for cache management
// we won't do the request if data didn't change
appRouter.get('/stocks', cacheMiddleware(30, stocksCacheId), (req, res) => {
    // console logger for node server
    console.log(green, '[ GET ] /allstocks');
    getStocks(req, res);
});
/**
 * @api {get} / Update the stock by Id
 * @apiName Update
 * @apiGroup Stock
 * @apiSuccess {String} message Stock updated successfully
 **/
appRouter.put('/stocks/:id', (req, res) => {
    // console logger for node server
    console.log(green, '[ PUT ] /stocks/:id');
    updateStock(req, res);
    const cacheContent = memCache.del(stocksCacheId);
    console.log(green, 'CLEAN CACHE', cacheContent);
});

/**
 * @exports appRouter
 */
export default appRouter;