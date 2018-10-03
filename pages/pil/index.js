const { reduce, isUndefined } = require('lodash');
const { Router } = require('express');
const certificateSchema = require('./certificate/schema');
const moduleSchema = require('./modules/schema');
const proceduresSchema = require('./procedures/schema');

const buildModel = (...args) => {
  return Object.assign(
    ...args.map(schema => {
      return reduce(schema, (fields, { nullValue }, key) => {
        return { ...fields, [key]: isUndefined(nullValue) ? null : nullValue };
      }, {})
    })
  )
};

module.exports = () => {
  const app = Router();

  app.param('pil', (req, res, next, pil) => {
    if (pil === 'create') {
      req.model = buildModel(certificateSchema, moduleSchema, proceduresSchema);
      req.model.id = 'new-training';
      return next();
    }
  });

  app.use('/:pil', require('./dashboard')());

  app.get('/', require('./categories')());

  return app;
};
