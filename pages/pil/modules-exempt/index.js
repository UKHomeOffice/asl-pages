const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { moduleCodes } = require('@asl/constants');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', (req, res, next) => {
    const exemptions = req.profileData.exemptions;

    req.model = {
      modules: []
    };

    req.model = exemptions.reduce((obj, value, key) => {
      const module = value.modules[0].module;
      return {
        ...obj,
        modules: [ ...obj.modules, module ],
        [`module-${module}-id`]: value.id,
        [`module-${module}-reason`]: value.exemptionDescription
      };
    }, req.model);

    next();
  });

  app.use('/', form({
    schema: {
      ...schema,
      ...schema.modules.options.reduce((obj, val) => {
        return {
          ...obj,
          [`module-${module}-id`]: {
            inputType: 'input-hidden'
          },
          [`module-${val.value}-reason`]: val.reveal.reason
        };
      }, {})
    },
    locals: (req, res, next) => {
      res.locals.static.schema = schema;
      Object.assign(
        res.locals.static.content.errors,
        {
          ...moduleCodes.reduce((obj, code) => {
            return {
              ...obj,
              [`module-${code}-reason`]: res.locals.static.content.errors.reason
            };
          }, {})
        }
      );
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const values = req.form.values.modules.map(m => {
      return {
        id: req.model[`module-${m}-id`],
        modules: [{ module: m, species: [] }],
        exemption: true,
        exemptionDescription: req.form.values[`module-${m}-reason`],
        profileId: req.profile
      };
    });

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
