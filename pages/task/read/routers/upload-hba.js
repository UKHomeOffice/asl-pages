const { Router } = require('express');
const bodyParser = require('body-parser');
const { UnauthorisedError } = require('@asl/service/errors');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    if (!req.user.profile.asruUser) {
      return next(new UnauthorisedError('Only ASRU users can upload harm benefit analysis files'));
    }
    next();
  });

  return app;
};
