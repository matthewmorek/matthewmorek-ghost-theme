/*!
 * Polyfills
 * 2016 © MADBIT Co.
 */

/* eslint-disable no-unused-vars */

/**
 * forEach polyfil
 * @param {Array} array - an array of elements to process
 * @param {Function} callback - evaluation callback
 * @param {thisArg} scope - callback scope
 */
var forEach = function (array, callback, scope) {
  'use strict';
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

/**
 * Utility method for binding events programmatically
 * @param {Element} element - and element to bind event to
 * @param {String} type - event type
 * @param {Function} handler - callback function for the event
 */
var bindEvent = function (element, type, handler) {
  'use strict';
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    element.attachEvent('on' + type, handler);
  }
};

/**
 * Utility method to allow chaining of el.classList methods
 * @param {Element} element - an element to bind new methods to
 */
var classList = function (el) {
  var list = el.classList;

  return {
    toggle: function (c) { list.toggle(c); return this; },
    add: function (c) { list.add(c); return this; },
    remove: function (c) { list.remove(c); return this; }
  };
};

/* eslint-enable no-unused-vars */
