const { page } = require('@asl/service/ui');
const {get} = require("lodash");
const content = require("../delete/content");



module.exports = ({ modelType, action }) => {
  const app = page({
    root: __dirname
  });

  const getVersion = (id) => {
    return 'test';
  };

  app.use((req, res, next) => {
    res.locals.model = req.project;
    next();
  });

  app.get('/', (req, res, next) => {
    // console.log(req);
    // res.locals.version = getVersion(req.project.granted.id)
    // req.api(`/establishment/${req.establishmentId || req.establishmentId}`)
    //   .then(({ json: { data } }) => data)
    //   .catch(err => Promise.reject(err));
    next();
  });

  // app.post('/manage-conditions', (req, res, next) => {
  //   // when posting to manage conditions we first create a new draft version of the project
  //   req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/fork`, { method: 'POST' })
  //     .then(response => {
  //       const modelId = get(response, 'json.data.data.id');
  //       req.versionId = get(response, 'json.data.data.data.version', modelId);
  //       // After the new draft is created we want to submit it and redirect to the task
  //       res.redirect(req.buildRoute('task.read'));
  //     })
  //     .catch(next);
  // });

  // app.post('/manage-conditions', (req, res, next) => {
  //   return req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/fork`, { method: 'POST' })
  //     .then(response => {
  //       console.log('Draft created');
  //       const modelId = get(response, 'json.data.data.id');
  //       req.versionId = get(response, 'json.data.data.data.version', modelId);
  //       // After the new draft is created we want to submit it and redirect to the task
  //       res.redirect(req.buildRoute('projectVersion.update'));
  //     })
  //     .catch(next);
  // });

  return app;
};
