import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Snippet, Header, Form, TrainingSummary, Details, Inset } from '@ukhomeoffice/asl-components';
import MandatoryTrainingRequirements from '../../components/mandatory-training-requirements';

const Page = () => {
  const { profile } = useSelector(state => state.static, shallowEqual);

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <span className="govuk-caption-l">{profile.firstName} {profile.lastName}</span>
        <Form cancelLink="profile.read">
          <Header title={<Snippet>title</Snippet>}/>
          <Snippet>nacwoMandatoryTrainingDesc</Snippet>
          <ul className="govuk-list govuk-list--bullet govuk-list--spaced">
            <li><Snippet>trianingUnless1</Snippet></li>
            <li><Snippet>trianingUnless2</Snippet></li>
          </ul>

          <Details summary={<Snippet>nacwoMandatoryTrainingRequirements</Snippet>} className="margin-bottom">
            <Inset><MandatoryTrainingRequirements /></Inset>
          </Details>

          <Details summary={<Snippet>checkTrainingRecord</Snippet>} className="margin-bottom">
            <Inset><TrainingSummary certificates={profile.certificates} /></Inset>
          </Details>
        </Form>
      </div>
    </div>
  );
};

export default Page;
