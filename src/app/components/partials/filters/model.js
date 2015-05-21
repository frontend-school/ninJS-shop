var baseModel = require('../../base/model.js');


module.exports = baseModel.extend({

    _defaults: {
        priced_first: false,
        sale_only: false,
        must_have: false,

        style: {
            'ballet_flats': false,
            'mary_jane': false,
            'pumps': false,
            'sandal': false,
            'slide': false
        }
    }

});