import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Page = () => {
  return (
    <h1>This is a test</h1>
  );
};

const mapStateToProps = ({ static: { addRoleTasks, schema, profile } }) => ({ addRoleTasks, schema, profile });
export default connect(mapStateToProps)(Page);
