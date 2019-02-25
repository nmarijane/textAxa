import Stock from './stock.model';

export const getAllStocks = async () => {
    try {
        const stocks = await Stock.find({});
        console.log('Loading all stocks...');
        res.send(stocks);
    } catch(err) {
        console.log('Error in loading stocks - ' + err);
        res.send('Got error in getAll');
    }
};

export const updateStock = async (req, res) => {
    try {
        const stocks = await Stock.findOneAndUpdate({_id: req.params.index}, req.body, {new: true});
        console.log('Updating all stocks...');
        res.json(stocks);
    } catch(err) {
        res.send(err);
    }
};

export default { getAllStocks, updateStock };
