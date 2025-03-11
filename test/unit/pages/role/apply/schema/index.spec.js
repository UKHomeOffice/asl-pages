import schema from '../../../../../../pages/role/apply/schema';

describe('Role schema', () => {
  let roles, establishment;

  beforeEach(() => {
    roles = ['holc', 'admin', 'holc-np']; // existing roles
    establishment = {
      corporateStatus: null
    };
  });

  describe('Basic schema structure', () => {
    it('includes comment field when named person feature flag is false', () => {
      const result = schema(roles, establishment, false);
      expect(result).toHaveProperty('comment');
      expect(result.comment.inputType).toBe('textarea');
    });

    it('excludes comment field when named person feature flag is true', () => {
      const result = schema(roles, establishment, true);
      expect(result).not.toHaveProperty('comment');
    });
  });

  describe('Role filtering', () => {
    it('excludes already assigned roles', () => {
      const result = schema(roles, establishment, false);
      const availableRoles = result.type.options.map(opt => opt.value);
      expect(availableRoles).not.toContain('holc');
      expect(availableRoles).not.toContain('admin');
    });

    it('excludes PELH for corporate establishments', () => {
      establishment.corporateStatus = 'corporate';
      const result = schema(roles, establishment, false);
      const availableRoles = result.type.options.map(opt => opt.value);
      expect(availableRoles).not.toContain('pelh');
    });

    it('excludes NPRC for non-profit establishments', () => {
      establishment.corporateStatus = 'non-profit';
      const result = schema(roles, establishment, false);
      const availableRoles = result.type.options.map(opt => opt.value);
      expect(availableRoles).not.toContain('nprc');
    });

    it('excludes PELH when named person feature flag is true', () => {
      const result = schema(roles, establishment, true);
      const availableRoles = result.type.options.map(opt => opt.value);
      expect(availableRoles).not.toContain('pelh');
    });
  });

  describe('Option formatting', () => {
    it('adds rcvsNumber reveal field for NVS role', () => {
      const result = schema(['holc'], establishment, false);
      const nvsOption = result.type.options.find(opt => opt.value === 'nvs');
      expect(nvsOption.reveal).toEqual({
        rcvsNumber: { inputType: 'inputText' }
      });
    });
  });
});
