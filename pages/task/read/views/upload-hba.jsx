import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Header,
  Form,
  WidthContainer,
  ErrorSummary
} from '@ukhomeoffice/asl-components';

const UploadHba = () => {
  return (
    <WidthContainer>
      <ErrorSummary />
      <Form>
        <Header
          title={<Snippet>title</Snippet>}
          subtitle={<Snippet>subtitle</Snippet>}
        />
        <p>
          <Snippet>intro</Snippet>
        </p>
      </Form>
    </WidthContainer>
  );
};

const mapStateToProps = ({ static: { task, values } }) => ({ task, values });

export default connect(mapStateToProps)(UploadHba);
