const { Router } = require('express');
const { cleanModel } = require('../../lib/utils');

const createNewPilApplication = (req, res, next) => {
  const opts = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' }
    // no body (we just want a blank pil returned with a new id)
  };

  req.api(`/establishment/${req.establishment}/profiles/${req.profile}/pil`, opts)
    .then(({ json: { data } }) => {
      return res.redirect(req.originalUrl.replace('create', data.id));
    })
    .catch(next);
};

module.exports = () => {
  const app = Router();

  app.use('/', (req, res, next) => {
    res.locals.static.establishment = req.user.profile.establishments.find(e => e.id === req.establishment);
    res.locals.static.profile = req.model;
    return next();
  });

  app.param('pil', (req, res, next, pilId) => {
    if (pilId === 'create') {
      console.log('attempting to create pil');
      // only create a pil if we haven't already got one for this profile
      if (!res.locals.static.profile.pil) {
        console.log('no existing pil found, creating pil');
        return createNewPilApplication(req, res, next);
      }

      console.log('existing pil found, redirecting');

      pilId = res.locals.static.profile.pil.id;
    }

    return req.api(`/establishment/${req.establishment}/profiles/${req.profile}/pil/${pilId}`)
      .then(({ json: { data } }) => {
        req.model = cleanModel(data);
      })
      .then(() => next())
      .catch(next);
  });

  app.use('/:pil', require('./application')());

  app.get('/', require('./categories')());

  return app;
};
