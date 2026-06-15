/**
 * Frozen mapping of the supported application roles.
 * @type {{ADMIN: string, MANAGER: string, EMPLOYEE: string}}
 */
export const UserRoles = Object.freeze({
  ADMIN: "admin",
  MANAGER: "manager",
  EMPLOYEE: "employee",
});

/**
 * Derived list of user role values.
 * @type {string[]}
 */
export const UserRoleValues = Object.freeze(Object.values(UserRoles));
