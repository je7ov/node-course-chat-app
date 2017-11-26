const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should return the correct message object', () => {
    const from = 'user1';
    const text = 'hello';
    const message = generateMessage(from, text);

    expect(message).toEqual(expect.objectContaining({ from, text }));
    expect(typeof message.timestamp).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should return the correct location message object', () => {
    const from = 'user1';
    const latitude =  13;
    const longitude = 37;
    const url = 'https://www.google.com/maps?q=13,37';
    const message = generateLocationMessage(from, latitude, longitude);

    expect(message).toEqual(expect.objectContaining({ from, url }));
    expect(typeof message.timestamp).toBe('number');
  });
});