const { omit } = require('lodash');
const participantDetailsSchemaHelper = require('./participant-details-schema-helper');

describe('participantDetailsSchemaHelper', () => {
  const schema = {
    jobTitle: 'Developer',
    fieldOfExpertise: 'Software Engineering',
    applicantTrainingUse: 'Development',
    qualificationLevelAndSubject: 'BSc Computer Science',
    applicantLearning: 'Advanced Programming'
  };

  it('should omit jobTitle, fieldOfExpertise, and applicantTrainingUse for higher-education course purpose', () => {
    const trainingCourse = { coursePurpose: 'Higher education' };
    const result = participantDetailsSchemaHelper(schema, trainingCourse);
    expect(result).toEqual(omit(schema, ['jobTitleOrQualification', 'fieldOfExpertise', 'applicantTrainingUseAtWork']));
  });

  it('should omit qualificationLevelAndSubject and applicantLearning for training course purpose', () => {
    const trainingCourse = { coursePurpose: 'Training' };
    const result = participantDetailsSchemaHelper(schema, trainingCourse);
    expect(result).toEqual(omit(schema, ['qualificationLevelAndSubject', 'applicantLearningUse']));
  });

  it('should throw an error for invalid course purpose', () => {
    const trainingCourse = { coursePurpose: 'invalid-purpose' };
    expect(() => participantDetailsSchemaHelper(schema, trainingCourse)).toThrowError('Invalid course purpose: invalid-purpose');
  });
});