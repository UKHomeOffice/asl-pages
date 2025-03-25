const { page } = require('@asl/service/ui');
const { form } = require('../../../common/routers');
const { buildModel } = require('../../../../lib/utils');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use((req, res, next) => {
    req.model = {
      id: `${req.profile.id}-npm`,
      ...buildModel(schema)
    };
    next();
  });

  app.use(form({
    configure(req, res, next) {
      req.form.schema = schema(req.profile);
      next();
    },
    saveValues: (req, res, next) => {
      req.session.form[req.model.id].values = req.form.values;
      next();
    }
  }));

  // eslint-disable-next-line no-warning-comments
  //TODO: redirects is not part of current ticket
  app.post('/', (req, res, next) => {
    const { mandatory } = req.form.values;
    if (mandatory) {
      return res.redirect(req.buildRoute('role.namedPersonMvp.create'));
    } else {
      return res.redirect(req.buildRoute('training.dashboard'));
    }
  });

  return app;
};
