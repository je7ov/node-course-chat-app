const generateMessage = (from, text) => {
  return {
    from,
    text,
    timestamp: Date.now()
  }
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    timestamp: Date.now()
  }
};

module.exports = {
  generateMessage,
  generateLocationMessage
};