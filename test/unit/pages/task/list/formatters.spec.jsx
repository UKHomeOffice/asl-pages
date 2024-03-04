import MockDate from 'mockdate';
import { afterEach, describe, expect, test } from '@jest/globals';
import { render } from 'enzyme';

import formatters from '../../../../../pages/task/list/formatters/index';

const RENDERED_DEADLINE = '8 Sep 2023';
const RAW_DEADLINE = '2023-09-08 17:00:00';

describe('Due and overdue tasks display deadlines based on the calendar day', () => {
  afterEach(() => {
    MockDate.reset();
  });

  function expectDeadlineMessage({ deadline, now, expectedText, urgent = true, expectedTitle }) {
    MockDate.set(now);

    const task = {
      withASRU: true,
      activeDeadline: deadline
    };

    // 1st argument is not used by the renderer
    const component = render(formatters.activeDeadline.format(null, task));

    const deadlineSpan = component.find(`span${urgent ? '.urgent' : ':not(.urgent)'} > span`);
    expect(deadlineSpan).toHaveLength(1);

    const deadlineText = deadlineSpan[0].children[0].data;
    expect(deadlineText).toContain(expectedText);

    if (expectedTitle) {
      const title = deadlineSpan.prop('title');
      expect(title).toEqual(expectedTitle);
    }
  }

  test('When the task is not yet due then the due date is displayed', () => {
    // Over 10 days the task should not be urgent
    expectDeadlineMessage(
      {
        deadline: RAW_DEADLINE,
        now: '2023-08-29 08:00:01',
        expectedText: RENDERED_DEADLINE,
        urgent: false }
    );
  });

  test('When the task is almost due then the due date is displayed and the task is urgent', () => {
    expectDeadlineMessage(
      {
        deadline: RAW_DEADLINE,
        now: '2023-09-07 08:00:01',
        expectedText: RENDERED_DEADLINE
      }
    );
  });

  describe('When the task is due on the current calendar day, "Due today" is displayed', () => {
    test('When the time has not passed', () => {
      expectDeadlineMessage(
        {
          deadline: RAW_DEADLINE,
          now: '2023-09-08 08:00:01',
          expectedText: 'Due today',
          expectedTitle: RENDERED_DEADLINE
        }
      );
    });

    test('When the time has passed', () => {
      expectDeadlineMessage(
        {
          deadline: '2023-09-08 08:00:00',
          now: '2023-09-08 17:00:01',
          expectedText: 'Due today',
          expectedTitle: RENDERED_DEADLINE
        }
      );
    });
  });

  test('When the task is overdue on the current calendar day, "Overdue" is displayed', () => {
    expectDeadlineMessage(
      {
        deadline: RAW_DEADLINE,
        now: '2023-09-09 00:00:01',
        expectedText: 'Overdue',
        expectedTitle: RENDERED_DEADLINE
      }
    );
  });
});
