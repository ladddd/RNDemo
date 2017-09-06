/**
 * Created by 陈伟达 on 2017/9/1.
 */
import RNFetchBlob from 'react-native-fetch-blob'
import Header from './Header'
import Urls from './Urls'
import global from '../global/global'

function post(url, body) {
    return httpRequest({
        method: 'POST',
        url: Urls.base + url,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
    })
}

function get(url) {

    return httpRequest({
        method: 'GET',
        url: Urls.base + url,
    })
}

function httpRequest(props) {
    let date = Header.getFormatDate();
    let sign = Header.getSign(props.url, props.body, false, date); //TODO 文件上传
    var headers = {
        'Authorization': Header.getAccessToken(),
        'Gateway-Version': Header.getGatewayVersion(),
        'Date': date,
        'User-Agent': Header.getUserAgent(),
        'Consumer-Key': Header.getConsumerKey(),
        'Disable-Function': Header.getDisableFunction(),
        'Geolocation': Header.getGeoLocation(),
        'Signature': sign,
    };
    if (props.headers) {
        headers = {
            ...props.headers,
            ...headers
        }
    }

    return new Promise((resolve, reject) => {
        fetch(props.url, {
            method: props.method,
            headers: headers,
            body:props.body
        }).then(res => {
            console.log(res);
            handleResult(resolve, reject, res, props)
        }).catch(errorMessage => {
            reject({
                code: -1,
                Message: errorMessage,
            })
        });

        // RNFetchBlob.fetch(props.method, props.url, headers, props.body)
        //     .then(res => {
        //         console.log(res);
        //         let json = res.json();
        //         handleResult(resolve, reject, json, props)
        //     }).catch((errorMessage) => {
        //     reject({
        //         code: -1,
        //         Message: errorMessage,
        //     })
        // })
    })
}

function handleResult(resolve, reject, res, props) {
    // if (!(res.respInfo)) {
    //     reject({
    //         Code: -1,
    //         Message: "请求失败",
    //     });
    //     return;
    // }
    let statusCode = res.status;
    res.json().then(json => {
        if (statusCode !== 200) {
            if (json) {
                reject({
                    Code: statusCode,
                    Message: res.data,
                })
            } else {
                reject({
                    Code: statusCode,
                    Message: "请求失败",
                });
            }
        }
        else if (json) {
            let code = json.Code;
            let data = json.data;
            let message = json.Message;
            if (typeof code === 'undefined') {
                code = json.code
            }
            if (typeof message === 'undefined') {
                message = json.message
            }
            if (code === 0) {
                console.log(data);
                resolve(data)
            }
            if (code === 3010) {
                global.serverTimeOffset = parseDate(json.ServerTime).getTime() - new Date().getTime();

                httpRequest(props).then(res => {
                    handleResult(resolve, reject, res, props)
                }).catch(errorMessage => {
                    reject({
                        code: -1,
                        Message: errorMessage,
                    })
                })
            }
            else {
                reject({
                    Code:code,
                    Message:message
                })
            }
        }
        else {
            reject({
                Code: statusCode,
                Message: "请求失败",
            });
        }
    });
}

function parseDate(str) {
    if (str && (typeof str !== 'undefined') && str !== '') {
        str = str.replace(/-/g, '/');
        return new Date(str);
    } else {
        return ''
    }
}

export default {
    post,
    get,
}