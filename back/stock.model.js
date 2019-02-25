import mongoose from 'mongoose';

/**
 * Stock Schema
 */
const StockSchema = mongoose.Schema({
    index: {
        type: String,
        required: 'Index is required'
    },
    stocks: {
        type: String,
        required: 'stock value is required',
        match: [/\d+(\.\d{1,3})?/, 'Stock\'s value is incorrect']
    },
    date: {
        type: Date,
        default: Date.now
    }
});


/**
 * @typedef Stock
 */
export default mongoose.model('Stock', StockSchema);