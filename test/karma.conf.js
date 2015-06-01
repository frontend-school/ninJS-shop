module.exports = function(config){
  config.set({

    files : [
      './unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['browserify', 'jasmine'],

    preprocessors: {
      './unit/*.js': [ 'browserify' ]
    },

    browserify: {
      debug: true,
      transform: [ 'brfs' ]
    },

    browsers : ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-browserify'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};