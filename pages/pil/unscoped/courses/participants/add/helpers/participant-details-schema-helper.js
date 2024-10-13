const { omit } = require('lodash');

function participantDetailsSchemaHelper (schema, trainingCourse) {
  if (trainingCourse.coursePurpose === 'higher-education') {
    return omit(schema, ['jobTitle', 'fieldOfExpertise', 'applicantTrainingUse']);
  } else if (trainingCourse.coursePurpose === 'training') {
    return omit(schema, ['qualificationLevelAndSubject', 'applicantLearning']);
  } else {
    throw new Error(`Invalid course purpose: ${trainingCourse.coursePurpose}`);
  }
}

module.exports = participantDetailsSchemaHelper;
