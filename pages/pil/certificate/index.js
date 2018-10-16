const bodyParser = require('body-parser');
const moment = require('moment');
const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');
const moduleSchema = require('../modules/schema');
const { buildModel } = require('../../../lib/utils');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use((req, res, next) => {
    req.model = buildModel(schema, moduleSchema);
    req.model.id = 'new-training';
    next();
  });

  app.use('/', form({
    schema,
    process: (req, res, next) => {
      const day = req.body['passDate-day'];
      const month = req.body['passDate-month'];
      const year = req.body['passDate-year'];

      Object.assign(req.form.values, {
        passDate: `${year}-${month}-${day}`
      });
      next();
    },
    saveValues: (req, res, next) => {
      req.session.form[req.model.id].values.passDate = moment(req.form.values.passDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
      next();
    }
  }));

  const profileOwnsModule = ({ trainingModules, exemptions }, moduleId) => {
    return [ ...trainingModules, ...exemptions ].some(m => m.id === moduleId);
  };

  app.post('/', bodyParser.urlencoded({ extended: true }), (req, res, next) => {
    if (req.body.action === 'delete' && req.body.trainingModuleId) {
      const profile = res.locals.model;
      const trainingModuleId = req.body.trainingModuleId;

      if (!profileOwnsModule(profile, trainingModuleId)) {
        throw new Error('cannot delete training modules the profile does not own');
      }

      const opts = {
        method: 'DELETE'
      };

      return req.api(`/establishment/${req.establishment}/profiles/${req.profile}/training/${trainingModuleId}`, opts)
        .then(() => res.redirect(req.originalUrl.replace(/training/, '')))
        .catch(next);
    }
    return res.redirect(req.originalUrl.replace(/training/, 'training/modules'));
  });

  app.use('/modules', require('../modules')());

  return app;
};
