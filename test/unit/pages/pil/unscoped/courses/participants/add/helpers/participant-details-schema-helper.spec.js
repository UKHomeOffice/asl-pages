import participantDetailsSchemaHelper from '../../../../../pages/pil/unscoped/courses/participants/add/helpers/participant-details-schema-helper';
import { omit } from 'lodash';

describe('participantDetailsSchemaHelper', () => {
  const schema = {
    jobTitle: 'Developer',
    fieldOfExpertise: 'Software Engineering',
    applicantTrainingUse: 'Development',
    qualificationLevelAndSubject: 'BSc Computer Science',
    applicantLearning: 'Advanced Programming'
  };

  it('should omit jobTitle, fieldOfExpertise, and applicantTrainingUse for higher-education course purpose', () => {
    const trainingCourse = { coursePurpose: 'higher-education' };
    const result = participantDetailsSchemaHelper(schema, trainingCourse);
    expect(result).toEqual(omit(schema, ['jobTitle', 'fieldOfExpertise', 'applicantTrainingUse']));
  });

  it('should omit qualificationLevelAndSubject and applicantLearning for training course purpose', () => {
    const trainingCourse = { coursePurpose: 'training' };
    const result = participantDetailsSchemaHelper(schema, trainingCourse);
    expect(result).toEqual(omit(schema, ['qualificationLevelAndSubject', 'applicantLearning']));
  });

  it('should throw an error for invalid course purpose', () => {
    const trainingCourse = { coursePurpose: 'invalid-purpose' };
    expect(() => participantDetailsSchemaHelper(schema, trainingCourse)).toThrowError('Invalid course purpose: invalid-purpose');
  });
});
