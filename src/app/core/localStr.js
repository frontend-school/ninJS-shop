module.exports = {

    saveObj: function(key, value) {

        localStorage.setItem(key,JSON.stringify(value));

    },

    retrieveObj: function(key, value) {

        return JSON.parse(localStorage.getItem(key));

    },

    setItem: function(key,value){
        localStorage.setItem(key,value);
    },

    getItem: function(key){
        return localStorage.getItem(key);
    },

    removeItem: function(key){
        return localStorage.removeItem(key);
    },

    isKey: function(key){
        return localStorage.getItem(key) !== null;
    },

    clear: function(){
        localStorage.clear();
    }

};