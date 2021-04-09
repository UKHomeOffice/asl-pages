import { getChanges } from '../../../../../pages/project-version/middleware';

describe('getChanges', () => {

  describe('legacy versions', () => {

    test('it returns zero changes when nothing has changed', () => {
      const previousVersion = {
        data: { 'title': 'Legacy project' }
      };

      const current = {
        data: { 'title': 'Legacy project' }
      };

      const changes = getChanges(current, previousVersion);
      const expected = [];

      expect(changes).toEqual(expected);
    });

    test('returns zero changes to protocols when empty array props are appended after adding AA', () => {
      const previousVersion = {
        data: {
          'title': 'Legacy project',
          'protocols': [
            {
              'id': '8a647535-4165-4528-b841-a6324a509e17',
              'steps': null,
              'speciesDetails': []
            }
          ],
          'establishments': [
            {
              'id': '33b7e108-9886-4d37-a04a-e0676e265d8f',
              'establishment-about': {
                'object': 'value',
                'document': {
                  'data': {},
                  'nodes': [
                    {
                      'data': {},
                      'type': 'paragraph',
                      'nodes': [
                        {
                          'text': 'Est 1',
                          'marks': [],
                          'object': 'text'
                        }
                      ],
                      'object': 'block'
                    }
                  ],
                  'object': 'document'
                }
              }
            }
          ]
        }
      };

      const current = {
        data: {
          'title': 'Legacy project',
          'protocols': [
            {
              'id': '8a647535-4165-4528-b841-a6324a509e17',
              'steps': null,
              'locations': [],
              'objectives': [],
              'speciesDetails': []
            }
          ],
          'establishments': [
            {
              'id': '33b7e108-9886-4d37-a04a-e0676e265d8f',
              'establishment-about': {
                'object': 'value',
                'document': {
                  'data': {},
                  'nodes': [
                    {
                      'data': {},
                      'type': 'paragraph',
                      'nodes': [
                        {
                          'text': 'Est 1',
                          'marks': [],
                          'object': 'text'
                        }
                      ],
                      'object': 'block'
                    }
                  ],
                  'object': 'document'
                }
              }
            }
          ]
        }
      };

      const changes = getChanges(current, previousVersion);
      expect(changes.includes('protocols')).toBe(false);
    });

  });

});
