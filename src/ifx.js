'use strict';

var If = function (condition, _fixed, _truthy, _fixedValue) {

  function isEmpty(value) {
    return value === null || value === undefined;
  }

  function isFunction(value) {
    return (value instanceof Function);
  }

  var fixed = isEmpty(_fixed) ? false : _fixed,
      truthy = isEmpty(_truthy) ? false : _truthy,
      fixedValue = isEmpty(_fixedValue) ? undefined : _fixedValue;

  if (!fixed) {
    truthy = condition ? true : false;
  }

  return function (callback) {
    if (!fixed && truthy) {
      fixed = true;
      if (isFunction(callback)) {
        fixedValue = callback();
      } else {
        throw new Error('If() can be applied to a function only');
      }
    }
    return {
      Get: function () {
        if (fixed) {
          return fixedValue;
        }
        return null;
      },
      Else: function (callback) {
        if (isFunction(callback)) {
          if (!fixed) {
            return callback();
          } else {
            return fixedValue;
          }
        } else {
          throw new Error('Else can be applied to a function only');
        }
      },
      ElseIf: function (condition) {
        return If(condition, fixed, truthy, fixedValue);
      }
    };
  };
};

module.exports = If;