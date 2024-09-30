const { pick } = require('lodash');
const schema = require('./');

module.exports = pick(schema, 'title', 'typeOfCourse', 'startDate', 'species', 'projectId');
