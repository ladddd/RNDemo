/**
 * Created by 陈伟达 on 2017/9/1.
 */
import DeviceInfo from 'react-native-device-info'
import {hex_md5} from '../utils/md5Utils'
import global from '../global/global'
import dateFormat from 'dateformat'

const EMPTY_SIGN = '00000000000000000000000000000000';
const CONSUMER_KEY = 'ae80b757c66741ccace3169a0d223acd';
const APP_SECRET = 'e429a5753d2402cd767c2eb6abd0306c';
const PATTERN_RFC1123 = "ddd, dd mmm yyyy HH:MM:ss";

function getUserAgent() {
    return DeviceInfo.getUserAgent()    
}

function getAccessToken() {
    return global.accessToken
}

function getGeoLocation() {
    return ''
}

function getConsumerKey() {
    return CONSUMER_KEY
}

function getGatewayVersion() {
    return '1'
}

function getDisableFunction() {
    return 'Cookie'
}

function getFormatDate() {
    let correctTime = new Date().getTime() + global.serverTimeOffset;
    return dateFormat(new Date(correctTime), PATTERN_RFC1123) + " GMT+0800"
}

function getSign(url, body, isUploadFile, dateStr) {
    let bodySign = EMPTY_SIGN;
    if (!isUploadFile && body && body !== '') {
        bodySign = hex_md5(utf8Encode(body));
    }

    let paramPart = getEncodedQuery(url).toLowerCase();
    let urlPart = getEncodedUrl(url).toLowerCase();

    let plainText;
    if (paramPart && paramPart !== '') {
        plainText = urlPart + '?' + paramPart + bodySign + dateStr + APP_SECRET
    } else {
        plainText = urlPart + bodySign + dateStr + APP_SECRET
    }
    console.log('plainText: ' + plainText);
    return 'v4:' + hex_md5(plainText)
}

function utf8Encode(str) {
    return unescape(encodeURIComponent(str))
}

function getEncodedQuery(url) {
    if(url){
        let queryStart = url.indexOf('?') + 1;
        if(queryStart > 0){
            let queryEnd = getEndOfUrl(url, queryStart + 1, url.length, '#');
            return url.substring(queryStart, queryEnd);
        }
    }
    return '';
}

function getEndOfUrl(input, pos, limit, delimiter) {
    for(let i = pos; i < limit; i++){
        if (input.charAt(i) === delimiter) return i;
    }
    return limit;
}

function getEncodedUrl(url) {
    if(url){
        let queryStart = url.indexOf('?');
        let splitStart = url.indexOf('//');
        if(queryStart === -1){
            queryStart = url.length;
        }
        if(splitStart === -1){
            splitStart = 0;
        } else {
            splitStart = splitStart + 2;
        }
        return url.substring(splitStart, queryStart)
    }
    return '';
}

export default {
    getUserAgent,
    getAccessToken,
    getGeoLocation,
    getConsumerKey,
    getGatewayVersion,
    getDisableFunction,
    getFormatDate,
    getSign
};