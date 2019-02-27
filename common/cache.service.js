/***********************/
/****CACHE MIDDLEWARE***/
/***********************/
import cache from "memory-cache";

/**
 * @describe('cacheMiddleware', function() {
   Use to store in cache memory
 });
 * @type {Cache}
 */
const memCache = new cache.Cache();
export const cacheMiddleware = (duration, key) => {
    return (err, req, res, next) => {
        let key = key;
        let cacheContent = memCache.get(key);
        if(cacheContent){
            console.log('Cache used');
            res.send( cacheContent );
        }else{
            res.sendResponse = res.send;
            console.log('ntm', err);
            res.send = (body) => {
                memCache.put(key,body,duration*1000);
                res.sendResponse(body)
            };
            next()
        }
    }
};

//key of the stock cache get request
export const stocksCacheId = 'stocksCache';
// function to clean cache code
export const cleanStockCache = () => {
    let cacheContent = memCache.get(stocksCacheId);
    if (cacheContent) {
        console.log(green, 'CLEAN CACHE');
        cacheContent.clean();
    }
};
