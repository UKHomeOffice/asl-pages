const page = require('../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  const buildTask = (taskCase, profile) => {
    const licence = taskCase.data.model;
    let action = {};

    switch (licence) {
      case 'pil':
        action = {
          label: 'PIL application',
          url: '',
          details: 'Profile Name'
        };
        break;
    }

    return {
      receivedAt: taskCase.updatedAt,
      establishment: profile.establishments[taskCase.data.establishmentId],
      licence,
      action
    };
  };

  app.get('/', (req, res, next) => {
    res.locals.static.profile = req.user.profile;

    return req.api(`/me/tasks`)
      .then(({ json: { data } }) => {
        const cases = data.json.data || [];

        console.log(req.profile);

        const tasks = cases.map(taskCase => buildTask(taskCase, req.profile));

        console.log(tasks);
        res.locals.static.tasks = tasks;
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};
