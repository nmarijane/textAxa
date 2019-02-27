import axios from 'axios';
import {FAKESERVER_BASE_URL} from "../common/constants";
import {cleanStockCache} from "../app/routes";

/**** URL SPECIFIC API *****/
const API_STOCK = FAKESERVER_BASE_URL + "/stocks";
const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
};
//we are using Axio to be able to use promises on our requests
//we also use async/await syntax which is more comfortable to play with promises

    /**
     * @function getStocks
     * @param req: Use to define the limit of results
     * @param res: response returned to the front
     * @description Get All the stock without any limits
     * */
    export const getStocks = async (req, res) => {
        try {
            console.log('Loading all stocks...', API_STOCK, req.query);
            let query = '';
            if (req.query && req.query.limit) {
                query = '?_limit=' + req.query.limit;
            }
            const response = await axios.get(API_STOCK + query, config);
            //map the data as we want
            const stocks = response.data.map((item) => {
                return {
                    id: item.id,
                    date: new Date(item.timestamp),
                    value: item.stocks,
                };
            });
            res.send(stocks);
            console.log('Return stocks');
        } catch (err) {
            cleanStockCache();
            res.send(err);
            console.error(err);
        }
    };

    /**
     * @function updateStock
     * @param req: Use to define the index of the stock
     * @param res: response returned to the front
     * @description Update the stock
     * */
    export const updateStock = async (req, res) => {
        try {
            console.log('Updating a stock...');
            const response = await axios.put(API_STOCK + "/" + req.body.id, req.body);
            cleanStockCache();
            res.send(response.data);
            console.info(response.data);

        } catch (err) {
            res.send(err);
            console.error(err);
        }
    };
