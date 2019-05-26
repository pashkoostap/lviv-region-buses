const waitFor = (promise, time) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(promise);
    }, time);
  });

module.exports = { waitFor };
