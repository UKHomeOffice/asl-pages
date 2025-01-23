const { page } = require('@asl/service/ui');
const { form } = require('../../../common/routers');
const { create } = require('../../routes');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use(form({
    schema,
    process: (req, res, next) => {
      next();
    },
    saveValues: (req, res, next) => {
      req.session.form[req.model.id].values = req.form.values;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    res.redirect(create);
  });

  return app;
};
