const page = require('../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    res.locals.static.profile = req.user.profile;

    return req.api(`/me/tasks`)
      .then(({ json: { data } }) => {
        // todo: double-wrapped workflow data seems nasty, find a better way
        const tasks = data.json.data;
        console.log(tasks);
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};
