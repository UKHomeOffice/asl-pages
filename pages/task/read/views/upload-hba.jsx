import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Snippet, Header } from '@ukhomeoffice/asl-components';
// import { Button } from '@ukhomeoffice/react-components';

const UploadHba = () => {
  return (
    <Fragment>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={<Snippet>subtitle</Snippet>}
      />
      <p><Snippet>intro</Snippet></p>
    </Fragment>);
};

const mapStateToProps = ({ static: { task, values } }) => ({ task, values });

export default connect(mapStateToProps)(UploadHba);
