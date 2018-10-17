const { Router } = require('express');
const { cleanModel } = require('../../lib/utils');

const createNewPilApplication = (req, res, next) => {
  const opts = {
    method: 'POST'
    // no body (we just want a blank pil returned with a new id)
  };

  req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil`, opts)
    .then(({ json: { data } }) => {
      return res.redirect(req.originalUrl.replace('create', data.id));
    })
    .catch(next);
};

const profileHasPil = profile => !!profile.pil;

module.exports = () => {
  const app = Router();

  app.use('/', (req, res, next) => {
    res.locals.static.establishment = req.user.profile.establishments.find(e => e.id === req.establishmentId);
    res.locals.static.profile = req.model;
    next();
  });

  app.param('pil', (req, res, next, pilId) => {
    if (pilId === 'create') {
      return profileHasPil(req.profile)
        ? res.redirect(req.originalUrl.replace('create', req.profile.pil.id))
        : createNewPilApplication(req, res, next);
    }

    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${pilId}`)
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
