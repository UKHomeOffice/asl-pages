const { Router } = require('express');
const { merge, get } = require('lodash');
const successContent = require('../../../common/content/success-messages');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.breadcrumb('task.success');
    req.model = { id: req.task.id };
    next();
  });

  app.use((req, res, next) => {
    const status = get(req.session, `form.${req.model.id}.values.status`);
    req.status = status;

    res.locals.static.profile = req.task.data.changedBy;
    next();
  });

  app.use((req, res, next) => {
    const model = req.task.data.model === 'place' || req.task.data.model === 'role' ? 'pel' : req.task.data.model;
    const content = get(successContent, `${model}.${req.task.type}.${req.status}`, successContent.fallback);
    merge(res.locals.static.content, { success: content });
    next();
  });

  app.get('/', (req, res, next) => {
    if (req.session.form && req.session.form[req.model.id]) {
      delete req.session.form[req.model.id];
    }
    next();
  });

  return app;
};
