import React, { Component } from 'react';
import Link from './link';

class Tasklist extends Component {
  render() {
    const { tasks } = this.props;
    const outstandingCount = tasks.length;
    const outstandingMessage = outstandingCount > 0
      ? `You have ${outstandingCount} outstanding tasks`
      : 'You have no outstanding tasks';

    return (
      <div className="tasklist">
        <h2>Tasks</h2>
        <p>{outstandingMessage}</p>

        {
          tasks.length > 0 && (
            <table className="govuk-table">
              <thead>
                <tr>
                  <th>Received</th>
                  <th>Establishment</th>
                  <th>Licence</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {
                  tasks.map((task, index) => (
                    <tr key={index}>
                      <td>{task.receivedAt}</td>
                      <td>{task.establishment.name}</td>
                      <td>{task.licence}</td>
                      <td>
                        <Link href={task.action.url} label={task.action.label} />
                        {task.action.details}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>
    );
  }
}

export default Tasklist;
