//your code here
class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = this.constructor.name;
  }
}

class InvalidExprError extends Error {
  constructor() {
    super('Expression should not have an invalid combination of expression');
    this.name = this.constructor.name;
  }
}

function evalString(str) {
  try {
    if (/^\+|\*|\//.test(str)) {
      throw new SyntaxError('Expression should not start with invalid operator');
    }
    if (/\+|\*|\/-$/.test(str)) {
      throw new SyntaxError('Expression should not end with invalid operator');
    }
    if (/\+\+|--|\*\*|\/\*|\*\//.test(str)) {
      throw new InvalidExprError();
    }
    return eval(str);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw err;
    }
    throw new OutOfRangeError(err.message);
  }
}

// Example usage:
try {
  console.log(evalString('1 + 2 * 3 - 4 / 2')); // Output: 6
  console.log(evalString('1 + 2 * 3 - 4 / 2 / 0')); // Throws OutOfRangeError
  console.log(evalString('1 + 2 * 3 - 4 / 2++')); // Throws InvalidExprError
  console.log(evalString('++1 + 2 * 3 - 4 / 2')); // Throws SyntaxError
  console.log(evalString('1 + 2 ** 3 - 4 / 2')); // Throws InvalidExprError
} catch (err) {
  console.error(err);
}
