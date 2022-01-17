module.exports = function (service, res, status = 200, serviceParams = []) {
  service(...serviceParams)
    .then((response) => res.status(status).send(response))
    .catch((error) => {
      if (error.name === 'TypeError')
        res.status(400).send(`Bad request! ${error.message}`);
      else {
        console.error(error);
        res.status(500).send('Something happened... Please, try again');
      }
    });
};
