const { Router } = require("express");
const bodyParser = require("body-parser");
const { UnauthorisedError } = require("@asl/service/errors");
const { get } = require("lodash");
const { form } = require("../../../common/routers");
const schema = require("../../schema/upload-hba");
const fetch = require("node-fetch");
const { default: axios } = require("axios");
const FormData = require('form-data');


module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    if (!req.user.profile.asruUser) {
      return next(
        new UnauthorisedError(
          "Only ASRU users can upload harm benefit analysis file"
        )
      );
    }
    next();
  });

  app.use(
    form({
      schema,
      locals(req, res, next) {
        res.locals.static.establishment = req.establishment;
        next();
      },
    })
  );

  // File(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag | undefined): File
  app.post("/", async (req, res, next) => {
    const file = req.files?.upload?.[0];
    const formData = new FormData();
    
    console.log("I AM THE FILE", file);
    console.log('hello joe 🏄‍♂️');
    
    // File parsed by multer from incoming request
    formData.append('file', file.buffer, file.originalname);
    console.log('formData.getHeaders()', formData.getHeaders());

    try {
      // TODO: figure out how to correctly proxy /attachment/server-upload => localhost:8092/...
      const result = await axios.post('http://localhost:8092/', formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      console.log('axios result', result);
    } catch (error) {
      console.error(error)
    }
      
    next();
  });

  app.post("/", (req, res, next) => {
    const daysSinceDeadline = get(req.task, "data.deadline.daysSince");
    const hasDeadlinePassedReason = get(
      req.task,
      "data.meta.deadline-passed-reason"
    );
    const model = get(req.task, "data.model");
    const action = get(req.task, "data.action");
    const status = get(req.form, "values.status");
    const isAsruUser = req.user.profile.asruUser;

    if (
      model === "project" &&
      isAsruUser &&
      daysSinceDeadline > 0 &&
      !hasDeadlinePassedReason
    ) {
      return res.redirect(req.buildRoute("task.read.deadlinePassed"));
    }

    if (model === "project" && action === "grant-ra" && status === "endorsed") {
      return res.redirect(req.buildRoute("task.read.raAwerb"));
    }

    if (
      model === "project" &&
      ["grant", "transfer", "update"].includes(action) &&
      status === "endorsed"
    ) {
      return res.redirect(req.buildRoute("task.read.endorse"));
    }

    return res.redirect(req.buildRoute("task.read", { suffix: "confirm" }));
  });

  return app;
};
