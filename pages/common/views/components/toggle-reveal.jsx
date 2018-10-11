import React, { Component } from 'react';
import classnames from 'classnames';
import Inset from './inset';

class ToggleReveal extends Component {
  componentDidMount() {
    this.setState({
      visible: this.props.value === 'true'
    });
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    const visible = e.target.checked;
    this.setState({ visible });
  }

  render() {
    const { fieldName, label, children } = this.props;

    return (
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend">
          <h2 className="govuk-fieldset__heading govuk-heading-l">{label}</h2>
        </legend>
        <div className="govuk-checkboxes govuk-checkboxes--inline">

          <div className="govuk-checkboxes__item" >
            <input
              className="govuk-checkboxes__input"
              id={`toggle-reveal-${fieldName}`}
              type="checkbox"
              name={`toggle-reveal-${fieldName}`}
              value={true}
              checked={this.state ? this.state.visible : false}
              onChange={this.toggle}
            />
            <label htmlFor={`toggle-reveal-${fieldName}`} className="govuk-label govuk-checkboxes__label" />
          </div>

        </div>
        <Inset
          className={classnames({
            hidden: this.state && !this.state.visible
          })}
          onChange={e => this.toggle(e)}
        >
          { children }
        </Inset>
      </fieldset>
    );
  }
}

export default ToggleReveal;
