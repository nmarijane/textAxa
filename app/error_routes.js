import express from "express";
import {red} from "../common/constants";
const errorRouter = express.Router();

/***********************/
/**** ERROR HANDLER ***/
/***********************/
errorRouter.get('/404', function(req, res, next){
    next();
});

errorRouter.get('/403', function(req, res, next){
    // trigger a 403 error
    const err = new Error('not allowed!');
    err.status = 403;
    next(err);
});

errorRouter.get('/500', function(req, res, next){
    // trigger a generic (500) error
    next(new Error('Internal Server Error!'));
});

errorRouter.use(function(req, res, next){
    res.status(404);
    console.log(red, '[ GET ] /404 Error');
    res.format({
        html: function () {
            res.render('404', { url: req.url })
        },
        json: function () {
            res.json({ error: 'Not found' })
        },
        default: function () {
            res.type('txt').send('Not found')
        }
    })
});

/**
 * @exports errorRouter
 */
export default errorRouter;