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

const EstablishmentNames = ({task, establishment}) => {
  if (task.data.action === 'transfer') {
    const {from, to} = task.data.meta.establishment;
    return <>
      <p>
        <strong>
          <Snippet>fields.currentEstablishment.label</Snippet>
        </strong>
        <br />
        {from.name}
      </p>
      <p>
        <strong>
          <Snippet>fields.proposedEstablishment.label</Snippet>
        </strong>
        <br />
        {to.name}
      </p>
    </>;
  } else {
    return <p>
      <strong>
        <Snippet>fields.establishment.label</Snippet>
      </strong>
      <br />
      {establishment.name}
    </p>;
  }
};

const LicenceNames = ({task, licenceHolder}) => {
  if (task.data.action === 'update') {
    return <>
      <p>
        <strong>
          <Snippet>fields.currentPPLLicenceHolder.label</Snippet>
        </strong>
        <br />
        {task.data.profile.name}
      </p>
      <p>
        <strong>
          <Snippet>fields.proposedPPLLicenceHolder.label</Snippet>
        </strong>
        <br />
        {licenceHolder.name}
      </p>
    </>;
  } else if (task.data.action === 'transfer') {
    return <p>
      <strong>
        <Snippet>fields.pplHolder.label</Snippet>
      </strong>
      <br />
      {licenceHolder.name}
    </p>;
  } else {
    return <p>
      <strong>
        <Snippet>fields.applicant.label</Snippet>
      </strong>
      <br />
      {licenceHolder.name}
    </p>;
  }
};

const ConfirmHba = ({ establishment, licenceHolder, hba, task }) => {
  let action = task.data.action;
  const uploadType = getTypeAdjustedWording(action, task.type);
  if (isAmendment(action, task.type)) {
    action = 'update';
  }
  return (
    <WidthContainer>
      <ErrorSummary />
      <Form>
        <Header
          title={<Snippet>title</Snippet>}
          subtitle={<Snippet>{`tasks.${task.data.model}.${action}`}</Snippet>}
        />
        <EstablishmentNames establishment={establishment} task={task} />
        <LicenceNames licenceHolder={licenceHolder} task={task} />
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
