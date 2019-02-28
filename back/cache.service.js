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
export let memCache = new cache.Cache();
export let cacheMiddleware = (duration, keyId) => {
    return (req, res, next) => {
        let key = keyId;
        let cacheContent = memCache.get(key);
        if(cacheContent){
            console.log('Cache used');
            res.send( cacheContent );
        }else{
            res.sendResponse = res.send;
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