const { Router } = require('express');

const createNewPilApplication = (req, res, next) => {
  const opts = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' }
    // no body (we just want a blank pil returned with a new id)
  };

  req.api(`/establishment/${req.establishment}/profiles/${req.profile}/pil`, opts)
    .then(response => {
      res.locals.static.pil = response.json.data;
    })
    .then(() => {
      const pilId = res.locals.static.pil.id;
      return res.redirect(req.originalUrl.replace('create', pilId).concat('/application'));
    })
    .catch(next);
};

module.exports = () => {
  const app = Router();

  app.param('pil', (req, res, next, id) => {
    return (id === 'create') ? createNewPilApplication(req, res, next) : next();
  });

  app.use('/:pil', require('./application')());

  app.get('/', require('./categories')());

  return app;
};
