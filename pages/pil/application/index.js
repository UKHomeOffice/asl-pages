const page = require('../../../lib/page');
const bodyParser = require('body-parser');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/success']
  });

  app.post('/', bodyParser.urlencoded({ extended: true }), (req, res, next) => {
    if (req.body.action !== 'submit-pil-application') {
      return next();
    }

    console.log('PIL submitted');

    const pilId = req.profileData.pil.id;

    const opts = {
      method: 'PUT',
      json: { submitted_at: new Date() }
    };

    return req.api(`/establishment/${req.establishment}/profiles/${req.profile}/pil/${pilId}`, opts)
      .then(() => res.redirect(req.originalUrl + '/success'))
      .catch(next);
  });

  app.use('/', (req, res, next) => {
    req.model.procedures = req.model.procedures || [];
    res.locals.model = req.model;
    res.locals.static.pil = req.model;

    // if we've already submitted a PIL, go directly to the status
    if (req.model.submitted_at) {
      return res.redirect(req.originalUrl + '/success');
    }

    next();
  });

  app.use('/procedures', require('../procedures')());

  app.use('/exemptions', require('../exemptions')());

  app.use('/training', require('../certificate')());

  return app;
};
