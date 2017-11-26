const generateMessage = (from, text) => {
  return {
    from,
    text,
    timestamp: Date.now()
  }
};

module.exports = {
  generateMessage
};