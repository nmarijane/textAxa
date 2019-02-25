import express from "express";
import stockController from '../back/stock.controller';
const appRouter = express.Router();

appRouter.get('/', function(req, res) {
    console.log('\x1b[32m%s\x1b[0m', '[ GET ] / index page');
    res.render("index");
});
// App Routes
appRouter.get('/allstocks', () => {
    console.log('\x1b[32m%s\x1b[0m', '[ GET ] /allstocks');
    stockController.getAllStocks();
});


appRouter.put('/stocks/:stockId', (req, res) => {
    console.log('\x1b[32m%s\x1b[0m', '[ GET ] /stocks/:stockId');
    stockController.updateStock(req, res);
});

/**** ERROR HANDLER ***/
appRouter.get('/404', function(req, res, next){
    next();
});

appRouter.get('/403', function(req, res, next){
    // trigger a 403 error
    const err = new Error('not allowed!');
    err.status = 403;
    next(err);
});

appRouter.get('/500', function(req, res, next){
    // trigger a generic (500) error
    next(new Error('Internal Server Error!'));
});

appRouter.use(function(req, res, next){
    res.status(404);
    console.log('\x1b[31m%s\x1b[0m', '[ GET ] /404 Error');
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
export default appRouter;