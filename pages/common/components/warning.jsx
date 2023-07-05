import React from 'react';

export const Warning = ({ children }) => {
  return (
    <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>
      <strong class="govuk-warning-text__text">{children}</strong>
    </div>
  );
};
