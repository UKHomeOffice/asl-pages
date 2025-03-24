import React, { Fragment } from 'react';
import content from './content';

export default function MandatoryTrainingRequirements({ role }) {
  const renderModules = (modules) => {
    return Object.entries(modules).map(([module, moduleDetails]) => (
      <tr key={module}>
        <td>{module}</td>
        <td>{moduleDetails.content}</td>
      </tr>
    ));
  };

  return (
    <Fragment>
      <h2>{content.nacwo.title}</h2>
      <table className="govuk-table">
        <thead>
          <tr>
            <th>Module</th>
            <th>Module number and content</th>
          </tr>
        </thead>
        <tbody>
          {renderModules(content.nacwo.modules)}
          <tr>
            <td colSpan="2">
              <div className="govuk-heading-s">{content.nacwo.additional.title}</div>
            </td>
          </tr>
          {renderModules(content.nacwo.additional.modules)}
        </tbody>
      </table>
    </Fragment>
  );
}
