import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Header,
  Form,
  WidthContainer,
  ErrorSummary
} from '@ukhomeoffice/asl-components';
import { Warning } from '../../../common/components/warning';
import { getTypeAdjustedWording, isAmendment } from './adjusted-wording';

const ConfirmHba = ({ establishment, licenceHolder, hba, task }) => {
  let action = task.data.action;
  const uploadType = getTypeAdjustedWording(action, task.type);
  if (isAmendment(action, task.type)) {
    action = 'update';
  }
  const { data: { meta: { establishment: { to: proposedEstablishmentName } } } } = task;


  return (
    <WidthContainer>
      <ErrorSummary />
      <Form>
        <Header
          title={<Snippet>title</Snippet>}
          subtitle={<Snippet>{`tasks.${task.data.model}.${action}`}</Snippet>}
        />
        {
          uploadType === 'transfer' ?
            <>
              <p>
                <strong>
                  <Snippet>fields.currentEstablishment.label</Snippet>
                </strong>
                <br />
                {establishment.name}
              </p>
              <p>
                <strong>
                  <Snippet>fields.proposedEstablishment.label</Snippet>
                </strong>
                <br />
                {proposedEstablishmentName.name}
              </p>
            </>
            :
            <p>
              <strong>
                <Snippet>fields.establishment.label</Snippet>
              </strong>
              <br />
              {establishment.name}
            </p>
        }
        {
          uploadType === 'amendment' ?
            <>
              <p>
                <strong>
                  <Snippet>fields.applicant.label</Snippet>
                </strong>
                <br />
                {task.data.profile.name}
              </p>
              <p>
                <strong>
                  <Snippet>fields.proposedApplicant.label</Snippet>
                </strong>
                <br />
                {licenceHolder.name}
              </p>
            </>
            :
            <p>
              <strong>
                <Snippet>fields.applicant.label</Snippet>
              </strong>
              <br />
              {task.data.profile.name}
            </p>

        }

        <p>
          <strong>
            <Snippet>fields.hbaFilename.label</Snippet>
          </strong>
          <br />
          <a href={`/attachment/${hba.hbaToken}`} download={`${hba.hbaFilename}`}>{hba.hbaFilename}</a>{' '}
        </p>
        <Warning>
          <Snippet type={uploadType}>warning</Snippet>
        </Warning>
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
