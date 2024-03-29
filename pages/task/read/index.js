const { page } = require('@asl/service/ui');
const routes = require('./routes');
const assign = require('./routers/assign');

module.exports = (settings) => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: [
      '/deadline-passed',
      '/remove-deadline',
      '/reinstate-deadline',
      '/extend',
      '/confirm',
      '/upload-hba',
      '/confirm-hba',
      '/success',
      '/endorse',
      '/review'
    ]
  });

  app.use('/assign', assign());

  return app;
};

module.exports.routes = routes;
