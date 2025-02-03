import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Snippet, Header, Form } from '@ukhomeoffice/asl-components';

const Page = () => {

  const { profile, trainingDashboardUrl } = useSelector(state => state.static, shallowEqual);

  return (
    <div>
      <span className="govuk-caption-l">{profile.firstName} {profile.lastName}</span>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Form cancelLink="profile.read">
            <Header title={<Snippet>title</Snippet>}/>
            { trainingDashboardUrl && <p className="govuk-body">{<Snippet>beforeYouNominateIntro</Snippet>}</p> }
          </Form>
        </div>

        <div className="govuk-grid-column-one-third">
          <div className="x-govuk-related-navigation">

            <p><h2 className="govuk-heading-m"><Snippet>supportingGuidanceTitle</Snippet></h2></p>

            <p className="govuk-body">
              <a className="govuk-link" href="https://www.gov.uk/guidance/research-and-testing-using-animals#add-a-named-person-role">Adding named person roles</a>
            </p>

            {/* Links not working correctly */}
            <p className="govuk-body">
              <a className="govuk-link" href="https://www.gov.uk/government/publications/conflict-of-interest-declaration-form-aspa-1986">Make a conflict of interest declaration</a>
            </p>

            <p className="govuk-body">
              <a className="govuk-link" href="https://www.gov.uk/government/publications/training-and-development-under-the-animals-scientific-procedures-act">Guidance on training and continuous professional development (CPD) under ASPA</a>
            </p>

            <p className="govuk-body">
              <a className="govuk-link" href="https://www.gov.uk/government/publications/the-operation-of-the-animals-scientific-procedures-act-1986">Guidance on the operation of the Animals (Scientific Procedures) Act 1986</a>
            </p>
          </div>

          <div className="x-govuk-related-navigation">
            <nav className="x-govuk-related-navigation__nav-section" role="navigation" aria-labelledby="related-navigation-related-content">
              <h2 className="x-govuk-related-navigation__main-heading" id="related-navigation-related-content"><Snippet>supportingGuidanceTitle</Snippet></h2>

              <ul className="x-govuk-related-navigation__link-list">
                <li className="x-govuk-related-navigation__link">
                  <a className="govuk-link x-govuk-related-navigation__section-link x-govuk-related-navigation__section-link--other" href="https://www.gov.uk/guidance/research-and-testing-using-animals#add-a-named-person-role">Adding named person roles</a>
                </li>
                <li className="x-govuk-related-navigation__link">
                  <a className="govuk-link x-govuk-related-navigation__section-link x-govuk-related-navigation__section-link--other" href="https://www.gov.uk/government/publications/conflict-of-interest-declaration-form-aspa-1986">Make a conflict of interest declaration</a>
                </li>
                <li className="x-govuk-related-navigation__link">
                  <a className="govuk-link x-govuk-related-navigation__section-link x-govuk-related-navigation__section-link--other" href="https://www.gov.uk/government/publications/training-and-development-under-the-animals-scientific-procedures-act">Guidance on training and continuous professional development (CPD) under ASPA</a>
                </li>
                <li className="x-govuk-related-navigation__link">
                  <a className="govuk-link x-govuk-related-navigation__section-link x-govuk-related-navigation__section-link--other" href="https://www.gov.uk/government/publications/the-operation-of-the-animals-scientific-procedures-act-1986">Guidance on the operation of the Animals (Scientific Procedures) Act 1986</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
