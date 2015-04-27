(function(window){
    'use strict';

    /**
     * Define global library namespace
     * @param {string} selectors
     * @returns {D} containing selected nodes list and library methods
     */
    var _D = function (selectors) {
        return new D(selectors);
    };

    /**
     * creates object node with library methods from existing DOM node
     * or creates new by tag otherwise
     * @param {string} selectors
     * @constructor
     */
    function D(selectors) {
        if (/^[a-zA-Z0-9]+$/.test(selectors)) {
            this.elements = [document.createElement(selectors)];
        } else {
            this.elements = Array.prototype.slice.call(document.querySelectorAll(selectors));
        }
    }

    /**
     * Inserts node into this node
     * @param {object | string} node, html, text
     * @returns {D}
     */
    D.prototype.put = function (node) {
        Array.prototype.forEach.call(this.elements, function (el) {
            if (node.elements) {
                el.innerHTML = '';
                el.appendChild(node.elements[0].cloneNode(true))
            } else {
                el.innerHTML = node;
            }
        });

        return this;
    };

    /**
     * Adds node to this parent
     * @param {object || html} node
     * @returns {D}
     */
    D.prototype.add = function (node) {
        Array.prototype.forEach.call(this.elements, function (el) {
            if (node.elements) {
                el.appendChild(node.elements[0].cloneNode(true));
            } else {
                el.insertAdjacentHTML('beforeend', node);
            }
        });

        return this;
    };

    /**
     * Removes first node from _D node list
     * @returns {D}
     */
    D.prototype.del = function () {
        this.elements[0].parentNode.removeChild(this.elements[0]);
        return this;
    };

    /**
     * Adds classes separated by spaces
     * @param {string} classesToAdd
     * @returns {D}
     */
    D.prototype.addClass = function (classesToAdd) {
        _handleClassChange(this.elements, classesToAdd, 'add');

        return this;
    };

    /**
     * Removes classes separated by spaces
     * @param classesToRemove
     * @returns {D}
     */
    D.prototype.removeClass = function (classesToRemove) {
        _handleClassChange(this.elements, classesToRemove, 'remove');

        return this;
    };

    /**
     * Toggles classes separated by spaces
     * @param classes
     * @returns {D}
     */
    D.prototype.toggleClass = function (classes) {
        _handleClassChange(this.elements, classes, 'toggle');

        return this;
    };

    /**
     * Performs addition, removal and toggling of classes
     * @param {Array} elements classes of which to be changed
     * @param {string} classes separated by spaces
     * @param {string} action add|remove|toggle
     * @private
     */
    function _handleClassChange(elements, classes, action) {
        var classesToChange = classes.split(' ');

        elements.forEach(function (el) {
            var elClasses = el.className.replace(/\s+/g, ' ').trim().split(' ');

            classesToChange.forEach(function (classToChange) {
                switch (action) {
                    case 'add':
                        if (elClasses.indexOf(classToChange) === -1) {
                            elClasses.push(classToChange);
                        }
                        break;
                    case 'remove':
                        elClasses.forEach(function(elClass){
                            if (elClass === classToChange) {
                                elClasses.splice(elClasses.indexOf(classToChange), 1);
                            }
                        });
                        break;
                    case 'toggle':
                        if (elClasses.every(function (elClass) {
                                return classToChange !== elClass;
                            })) {
                            elClasses.push(classToChange);
                        } else {
                            elClasses.splice(elClasses.indexOf(classToChange), 1);
                        }
                        break;
                }
            });

            el.className = elClasses.join(' ').trim();
        });
    }

    /**
     * Loops through the array and adds items between tags to the parent element
     * @param {Array} array data to be inserted between tags
     * @param {string} tag html tag
     * @returns {D}
     */
    D.prototype.loop = function(array, tag) {
        var that = this;

        array.forEach(function(item){
            that.add(_D(tag).put(item));
        });

        return that;
    };

    /**
     * Ads event listeners to the node list
     * @param {string} event
     * @param {function} callback
     * @returns {D}
     */
    D.prototype.bind = function (event, callback) {
        this.elements.forEach( function (el) {
            el.addEventListener(event, callback, false);
        });

        return this;
    };

    /**
     * Removes event listener
     * @param {string} event
     * @param {function} callback
     * @returns {D}
     */
    D.prototype.unbind = function (event, callback) {
        this.elements.forEach(function (el) {
            el.removeEventListener(event, callback, false);
        });

        return this;
    };

    /**
     * Applies css rules to selected elements
     * @param {object} styles css rules in json format
     * @returns {D}
     */
    D.prototype.css = function(styles) {
        this.elements.forEach(function (el) {
            for (var rule in styles) {
                el.style[rule] = styles[rule];
            }
        });
        return this;
    };

    /**
     * Extends library with custom methods
     * @param {string} name
     * @param {function} method
     */
    D.prototype.extend = function (name, method) {
        this.constructor.prototype[name] = method;
        console.log('hey', this.css)
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _D;
        }
        exports._D = _D;
    } else {
        window._D = _D;
    }

}(window || exports));