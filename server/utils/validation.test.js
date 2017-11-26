const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const str = { str: 'hello' };
    expect(isRealString(str)).toBe(false);
  });

  it('should reject string with only spaces', () => {
    const str = '      ';
    expect(isRealString(str)).toBe(false);
  });

  it('should allow non-empty strings', () => {
    const str = 'hello, world!';
    expect(isRealString(str)).toBe(true);
  });
});