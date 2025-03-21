
import React from 'react';

export const InsetBox = ({ children }) => (
  <div className="govuk-inset-text">
    <div className="govuk-box" style={{ border: '1px solid #000', padding: '20px', backgroundColor: '#fff' }}>
      {children}
    </div>
  </div>
);
