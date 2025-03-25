import React, { Fragment } from 'react';
import content from './content';

export default function MandatoryTrainingRequirements({ role }) {
  const renderModules = (modules) => {
    return Object.entries(modules).map(([module, moduleDetails]) => {

      return (
        <tr key={module} className="govuk-table__row">
          <td className="govuk-table__cell">
            {module}
            {moduleDetails.tag && (
              <>
                <br />
                <div style={{ backgroundColor: '#fff7bf', color: '#594d00', fontSize: '14px', textAlign: 'center' }}>
                  {moduleDetails.tag}
                </div>
              </>
            )}
          </td>
          <td className="govuk-table__cell">{moduleDetails.content.map(el => (<>{el}<br /></>))}</td>
        </tr>
      );
    });
  };

  return (
    <div className="govuk-box" style={{ border: '2px solid #000', borderColor: '#b1b4b6', padding: '15px', backgroundColor: '#fff' }}>
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
    </div>
  );
}
