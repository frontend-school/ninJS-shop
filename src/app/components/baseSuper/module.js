var baseModel = require('./model.js'),
    baseView = require('./view.js'),
    baseCollection = require('./collection.js'),
    pubsub = require('../../core/pubsub.js');


module.exports = function ModuleConstructor() {

    var _module,
        _handlers,
        _subscriptionsDefinitions,
        _handlersDefinitions,
        _scope = {},
        _dependencies = {};

    //temp
    _dependencies.$ = $;

    _scope.publisher = {
        publish: pubsub.publish
    };

    function view(view) {
        _scope.view = baseView.extend(view);

        return _module;
    }

    function model(model) {
        _scope.model = baseModel.extend(model);

        return _module;
    }

    function collection(coll) {
        _scope.collection = baseCollection.extend(coll);

        return _module;
    }

    function dependencies(deps) {
        _dependencies.$.extend(_dependencies, deps);

        return _module;
    }

    function defineSubscriptions(subs) {
        _subscriptionsDefinitions = subs;

        return _module;
    }

    function defineHandlers(handlers) {
        _handlersDefinitions = handlers;

        return _module;
    }

    function init() {
        initHandlers();
        subscribe();
        _scope.view.handlers = _handlers;
    }

    function subscribe() {
        _module._subscriptions = [];
        _subscriptionsDefinitions.forEach(function(sub) {
            _module.subscribe(sub.event, _handlers[sub.handler]);
        });
    }

    function remove() {
        _module.unsubscribeThis();
        _scope.view.remove();
    }

    function initHandlers() {
        if (!_handlers) {
            _handlers = {};

            injectDependencies();
        }
    }

    function injectDependencies() {
        var n,
            handlerDef,
            depsDef,
            deps;

        for (n in _handlersDefinitions) {
            //TODO make deps init async

            if (_handlersDefinitions.hasOwnProperty(n)) {
                handlerDef = _handlersDefinitions[n];
                depsDef = handlerDef.slice(0, handlerDef.length-1);
                deps = depsDef.map(function(def) {
                    return _scope[def] || _handlers[def] || _dependencies[def];
                });

                _handlers[n] = handlerDef[handlerDef.length-1].apply(null, deps);
            }
        }
    }


    _module = pubsub.extend({
        view: view,
        model: model,
        collection: collection,
        handlers: defineHandlers,
        dependencies: dependencies,
        subscriptions: defineSubscriptions,
        init: init,
        remove: remove
    });

    //temp make link to the module available as dependency
    _scope.module = _module;

    return _module;
};