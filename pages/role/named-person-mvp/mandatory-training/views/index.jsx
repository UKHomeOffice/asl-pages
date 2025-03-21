import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Snippet, Header, Form } from '@ukhomeoffice/asl-components';
import MandatoryTrainingRequirements from '../../components/mandatory-training-requirements';

const Page = () => {

  const { profile } = useSelector(state => state.static, shallowEqual);

  return (
    <div>
      <span className="govuk-caption-l">{profile.firstName} {profile.lastName}</span>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Form cancelLink="profile.read">
            <Header title={<Snippet>title</Snippet>}/>
            <Snippet>nacwoMandatoryTrainingDesc</Snippet>
            <MandatoryTrainingRequirements />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
