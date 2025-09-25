const log = (name, ...messages) => {
  console.log(`[${name}]:`, ...messages);
};

module.exports = {
  log,
};
