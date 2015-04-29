
/**
 * Module exports.
 */

module.exports = LocalStr;

function LocalStr() {
    'use strict';
    var localStr = {};
    localStr.setItem = function(key,value){
        localStorage.setItem(key,value);
    };

    localStr.getItem = function(key){
        return localStorage.getItem(key);
    };

    localStr.removeItem = function(key){
        return localStorage.removeItem(key);
    };
    /**
     * local storage save only string
     * use next funtions to put and retrieve
     * object value
     * */
    localStr.setItemObject = function(key, value){
        localStorage.setItem(key,JSON.stringify(value));
    };

    localStr.getItemObject = function(key){
        return JSON.parse(localStorage.getItem(key));
    };

    localStr.isKey = function(key){
        return localStorage.getItem(key)===null;
    };

    localStr.clear = function(){
        localStorage.clear();
    };

    return localStr;
}