var index = require('../../src/app/index.js');
var app = require('../../src/app/app.js');

describe('greeter', function () {

    beforeEach(function() {

        spyOn(app, 'init');

        app.init();

    });

    it('track that app has been inited', function () {
        expect(app.init).toHaveBeenCalled();
    });

});