import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Header,
  Form,
  WidthContainer,
  ErrorSummary
} from '@ukhomeoffice/asl-components';
import { Warning } from '../../../common/components/warning';

const ConfirmHba = ({ establishment, licenceHolder, hba }) => {
  return (
    <WidthContainer>
      <ErrorSummary />
      <Form>
        <Header
          title={<Snippet>title</Snippet>}
          subtitle={<Snippet>subtitle</Snippet>}
        />
        <p>
          <strong>
            <Snippet>fields.establishment.label</Snippet>
          </strong>
          <br />
          {establishment.name}
        </p>

        <p>
          <strong>
            <Snippet>fields.applicant.label</Snippet>
          </strong>
          <br />
          {licenceHolder.name}
        </p>
        <p>
          <strong>
            <Snippet>fields.hbaFilename.label</Snippet>
          </strong>
          <br />
          <a href={`/attachment/${hba.hbaToken}`}>{hba.hbaFilename}</a>{' '}
        </p>
        <Warning>
          <Snippet>warning</Snippet>
        </Warning>
        {/* {hba && (
          <p>
            <strong>
              <Snippet>fields.hba.label</Snippet>
            </strong>
            <br />
            <a href={`/attachment/${hba.hbaToken}`}>{hba.hbaFilename}</a>{" "}
          </p>
        )} */}
      </Form>
    </WidthContainer>
  );
};

const mapStateToProps = ({
  static: { task, establishment, licenceHolder, hba }
}) => ({
  task,
  establishment,
  licenceHolder,
  hba
});

export default connect(mapStateToProps)(ConfirmHba);
