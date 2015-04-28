'use strict';

/**
 * Attach a transform function to math.index
 * Adds a property transform containing the transform function.
 *
 * This transform creates a one-based index instead of a zero-based index
 */
function factory (type, config, load, typed) {
  var Index = require('../../type/Index');
  var index = load(require('../../function/construction/indexFactory'));

  index.transform = function () {
    var args = [];
    for (var i = 0, ii = arguments.length; i < ii; i++) {
      var arg = arguments[i];

      // change from one-based to zero based, and convert BigNumber to number
      if (arg instanceof type.Range) {
        arg.start--;
        arg.end -= (arg.step > 0 ? 0 : 2);
      }
      else if (typeof arg === 'number') {
        arg--;
      }
      else if (arg instanceof type.BigNumber) {
        arg = arg.toNumber() - 1;
      }
      else {
        throw new TypeError('Ranges must be a Number or Range');
      }

      args[i] = arg;
    }

    var res = new Index();
    Index.apply(res, args);
    return res;
  };

  return index.transform;
}

exports.factory = factory;
