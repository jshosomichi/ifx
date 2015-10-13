var If = require('../src/ifx');

describe('Ifx', function () {
  describe('If()', function () {

    it('bool -> a -> object', function () {
      expect(If(true)(function() {return 1}) instanceof Object).toBeTruthy();
    });

    it('undefined -> a -> object', function () {
      expect(If()(function() {return 1}).Else(function() {return 10})).toBe(10);
    });

    it('null -> a -> object', function () {
      expect(If(null)(function() {return 1}).Else(function() {return 10})).toBe(10);
    });
  });

  describe('Get() gets a value that matched first', function () {
    it ('1 matched -> first matched', function() {
      expect(If(true)(function() {return 5}).Get()).toBe(5);
    });

    it ('2 matched -> first matched', function() {
      expect(
        If(true)(function() {return 5})
        .ElseIf(true)(function() {return 10})
          .Get()
      ).toBe(5);
    });

    it ('no matched -> null', function() {
      expect(If(false)(function() {return 5}).Get()).toBe(null);
    });

    it ('get boolean', function() {
      expect(If(true)(function() {return true}).Get()).toBe(true);
    });

    it ('get string', function() {
      expect(If(true)(function() {return 'foo'}).Get()).toBe('foo');
    });

    it ('get object', function() {
      expect(If(true)(function() {return {x: 1}}).Get().x).toBe(1);
    });
  });

  describe('Else(x) gets x when no matched', function () {
    it ('1 matched -> matched value', function() {
      expect(
        If(true)(function() {return 1})
          .Else(function() {return 2})
      ).toBe(1);
    });

    it ('no matched -> else value', function() {
      expect(
        If(false)(function() {return 1})
          .Else(function() {return 2})
      ).toBe(2);
    });

    it ('1 matched (Use ElseIf) -> first matched', function() {
      expect(If(true)(function() {return 1})
        .ElseIf(false)(function() {return 2})
        .Else(function() {return 3})
      ).toBe(1);

      expect(If(false)(function() {return 1})
        .ElseIf(true)(function() {return 2})
        .Else(function() {return 3})
      ).toBe(2);
    });

    it ('no matched (Use ElseIf) -> first matched', function() {
      expect(If(false)(function() {return 1})
        .ElseIf(false)(function() {return 2})
        .Else(function() {return 3})
      ).toBe(3);
    });
  });

  describe('ElseIf() chains conditions', function () {
    it ('2 chain', function() {
      expect(If(false)(function() {return 1})
        .ElseIf(false)(function() {return 2})
        .ElseIf(true)(function() {return 3})
        .Get()
      ).toBe(3);
    });

    it ('3 chain', function() {
      expect(If(false)(function() {return 1})
        .ElseIf(false)(function() {return 2})
        .ElseIf(false)(function() {return 3})
        .ElseIf(true)(function() {return 4})
        .Get()
      ).toBe(4);
    });

    it ('first matched', function() {
      expect(If(false)(function() {return 1})
        .ElseIf(false)(function() {return 2})
        .ElseIf(true)(function() {return 3})
        .ElseIf(true)(function() {return 4})
        .Get()
      ).toBe(3);
    });
  });
});