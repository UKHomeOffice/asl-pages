import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Snippet, Header, Form, TrainingSummary } from '@ukhomeoffice/asl-components';
import MandatoryTrainingRequirements from '../../components/mandatory-training-requirements';
import { InsetBox } from '../../components/inset-box';

const Page = () => {

  const { profile } = useSelector(state => state.static, shallowEqual);

  const [showRequirements, setShowRequirements] = React.useState(false);
  const [showTrainingRecord, setShowTrainingRecord] = React.useState(false);

  const handleNacwoMandatoryTrainingRequirementsLink = (e) => {
    e.preventDefault();
    setShowRequirements(prevState => !prevState);
  };

  const handleTrainingRecordLink = (e) => {
    e.preventDefault();
    setShowTrainingRecord(prevState => !prevState);
  };

  return (
    <div>
      <span className="govuk-caption-l">{profile.firstName} {profile.lastName}</span>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Form cancelLink="profile.read">
            <Header title={<Snippet>title</Snippet>}/>
            <Snippet>nacwoMandatoryTrainingDesc</Snippet>
            <ul className="govuk-list govuk-list--bullet">
              <li><Snippet>trianingUnless1</Snippet></li>
              <li><Snippet>trianingUnless2</Snippet></li>
              <li>
                <a
                  className="govuk-link x-govuk-related-navigation__section-link x-govuk-related-navigation__section-link--other"
                  href="#nacwoMandatoryTrainingRequirements"
                  onClick={handleNacwoMandatoryTrainingRequirementsLink}
                >
                  <Snippet>nacwoMandatoryTrainingRequirements</Snippet>
                </a>
                {showRequirements && <MandatoryTrainingRequirements />}
              </li>
              <li>
                <a
                  className="govuk-link x-govuk-related-navigation__section-link x-govuk-related-navigation__section-link--other"
                  href="#checkTrainingRecord"
                  onClick={handleTrainingRecordLink}
                >
                  <Snippet>checkTrainingRecord</Snippet>
                </a>
                {showTrainingRecord &&
                  <InsetBox>
                    <TrainingSummary certificates={profile.certificates} />
                  </InsetBox>
                }
              </li>
            </ul>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
