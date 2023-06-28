const { merge, pick } = require("lodash");
const baseContent = require("./base");
const tasks = require("../../content/tasks");
// const versionContent = require('../../../project-version/update/endorse/content');
// const refusalNotice = require('./refusal-notice');

module.exports = merge({}, baseContent, {
  tasks,
  title: "Upload harm benefit analysis file",
  subtitle: "Project licence application",
  intro: `To grant this licence you must upload the PPL assessment form containing the harm benefit analysis for this application.
    
  The harm benefit anlaysis will be visible to ASRU only.`,
  fields: {
    upload: {
      label: "Upload file",
      hint: "You can review and confirm the file you've chosen before granting the licence. You can also update the file in the future, if required.",
    },
    // endorsement: {
    //   label: 'Endorsement'
    // },
    // restrictions: {
    //   label: 'Restrictions'
    // },
    // ...pick(versionContent.fields, ['awerb', 'awerb-review-date', 'awerb-exempt', 'awerb-dates', 'awerb-no-review-reason'])
  },
  errors: {
    upload: {
      fileRequired: "Select a harm benefit analysis file",
      maxSize: "The harm benefit analysis file should be smaller than 15MB",
      ext: "The selected file must be a .doc, .docx or .pdf",
    },
    // ...pick(versionContent.errors, ['awerb', 'awerb-review-date', 'awerb-exempt', 'awerb-dates', 'awerb-no-review-reason'])
  },
});
