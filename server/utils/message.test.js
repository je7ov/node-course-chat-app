const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should return the correct message object', () => {
    const from = 'user1';
    const text = 'hello';
    const message = generateMessage(from, text);
    
    expect(message).toEqual(expect.objectContaining({ from, text }));
    expect(typeof message.timestamp).toBe('number');
  });
});