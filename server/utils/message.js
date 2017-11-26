const moment = require('moment');

const generateMessage = (from, text) => {
  return {
    from,
    text,
    timestamp: moment().valueOf()
  }
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    timestamp: moment().valueOf()
  }
};

module.exports = {
  generateMessage,
  generateLocationMessage
};