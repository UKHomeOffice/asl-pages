const { omit } = require('lodash');
const { trainingCoursePurpose } = require('@ukhomeoffice/asl-constants');

function participantDetailsSchemaHelper (schema, trainingCourse) {
  if (trainingCourse.coursePurpose === trainingCoursePurpose.higherEducation) {
    return omit(schema, ['jobTitleOrQualification', 'fieldOfExpertise', 'applicantTrainingUseAtWork']);
  } else if (trainingCourse.coursePurpose === trainingCoursePurpose.training) {
    return omit(schema, ['qualificationLevelAndSubject', 'applicantLearningUse']);
  } else {
    throw new Error(`Invalid course purpose: ${trainingCourse.coursePurpose}`);
  }
}

module.exports = participantDetailsSchemaHelper;
