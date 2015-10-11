'use strict'

var If = function (bool, _fixed, _truthy, _fixedValue) {
  var isEmpty = function (value) {
      return value === null || value === undefined;
    },
    isFunction = function (value) {
      return (value instanceof Function);
    },
    fixed = isEmpty(_fixed) ? false : _fixed,
    truthy = isEmpty(_truthy) ? false : _truthy,
    fixedValue = isEmpty(_fixedValue) ? undefined : _fixedValue;

  if (isEmpty(bool)) {
    throw new Error('If cannot be applied to an empty value');
  }

  if (!fixed) {
    truthy = bool ? true : false;
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
        } else {
          return null;
        }
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
      ElseIf: function (bool) {
        if (isEmpty(bool)) {
          throw new Error('ElseIf cannot be applied to an empty value');
        }
        return If(bool, fixed, truthy, fixedValue);
      }
    };
  };
};

module.exports = If;