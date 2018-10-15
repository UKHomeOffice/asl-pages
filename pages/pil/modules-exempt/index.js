const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { omit } = require('lodash');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', (req, res, next) => {
    console.log(req.profileData)
    // req.model = {
    //   id: 'new-exemption',
    //   modules: ['L'],
    //   'module-L-reason': 'something'
    // };

    next();
  });

  app.use('/', form({
    schema,
    getValues: (req, res, next) => {
      console.log(req.form.values);
      next()
    },
    locals: (req, res, next) => {
      console.log(res.locals.model);
      return next()
    }
  }));

  app.post('/', (req, res, next) => {
    const values = omit(req.session.form[req.model.id].values, 'exempt');
    values.profileId = req.profile;
    values.modules = values.modules.map(module => ({ module, species: [] }));
    values.exemption = true;

    console.log(values)

    const opts = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };

    return req.api(`/establishment/${req.establishment}/profile/${req.profile}/training`, opts)
      .then(() => {
        delete req.session.form[req.model.id];
        return next();
      })
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.originalUrl.replace(/\/exemptions\/modules/, ''));
  });

  return app;
};
