/**
 * Created by 陈伟达 on 2017/9/1.
 */
'use strict';

export default function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("timeout"))
        }, ms);
        promise.then(resolve, reject);
    })
}