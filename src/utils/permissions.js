//
// Walking Doctors Role / Permission definitions
//
// Introduction: this system allows you to store role-based permissions as a
// JSON blob and run various checks on them.
//
// Three types of roles are supported:
//
// 1) Global roles: These are in effect for the whole app, not just an
// individual health system or location For example, you can have a role that
// makes the user an Admin for the whole WD system, or a role that marks a
// user as inactive for all health systems.
//
// 2) System roles: These roles apply to an entire health system and all the
// locations inside it. For example, if a user has the Doctor role for a
// health system, they are a doctor for every location in that system. The
// special role SystemAdmin controls administrative access to an entire
// system. Any system role also counts as a local role in all the locations in
// a system.
//
// 3) Local roles: These roles apply only to a specific location inside a
// health system. For example a Doctor at Locaiton X can only access patients
// at Location X, unless they also have permission at Location Y, or if they
// have a system permission. The special role LocalAdmin provides
// administrative access to a location.
//
// Format:
//
// The internal permissions format is designed to be compact, rather than
// readable. The Permissions class provides full API access to this format.
// Example with comments below.
//
// {
//   "roles": [
//       "Admin",         // This is the list of global roles.
//       "Translator"     // Values in here apply across all locations.
//   ],
//   "59c477a3e7eec54535164c29": {   // Entry for a health system
//       "roles": [                  // Note the key is the system ID
//           "Doctor"                // Here is a system-wide role.
//       ]
//       "59c477a3e7eec54535164c26": [  // Entry for a specific location
//           "Doctor"                   // Local role
//       ],
//   },
//   "59cedfba9ae80d05757f54e9": {   // Another system example, users can
//       "roles": [                  // be members of more than one system
//           "Doctor",               // Lots of system roles here.
//           "Nurse",
//           "Pharmacist",
//           "Registrar",
//           "BillingAdmin",
//           "Billing",
//           "PharmacyAdmin",
//           "SystemAdmin"
//       ],
//       "59cedfba9ae80d05757f54e7": [  // Another location
//           "Pharmacist"               // Specific local role
//       ]
//   }
// }
//
//
// Usage:
//
// > const json = '...' // Imagine this string is the above JSON, either in string
//                      // form or already parsed into an object
// > const permissions = new Permissions(jsonString)
// > permissions.hasRole('Admin')
// true
// > permissions.hasGlobalRole('Translator')
// true
// > permissions.hasGlobalRole('Robot')
// false
// > permissions.hasSystemRole('Doctor', '59c477a3e7eec54535164c29')
// true
// > permissions.hasSystemRole('Admin', '59c477a3e7eec54535164c29')
// false // (Admin is not a system role)
// > permissions.hasLocalRole('Doctor', '59c477a3e7eec54535164c29', '59c477a3e7eec54535164c26')
// true
// > permissions.hasLocalRole('Doctor', '59cedfba9ae80d05757f54e9', '59cedfba9ae80d05757f54e7')
// true // note that even though user doesn't have Doctor as a local role, the fact that
//      // they hae the system role Doctor allows them to be a local Doctor
//
// Please read the function definitions for documentation on the full API. There
// are quite a few nice shortcuts.
//

const debug = require('debug')('wd:permissions')

// These should not have the same names as system/local roles. If they do,
// any user with the global role will automatically have access to any system
// and location.
export const globalRoles = [
  { name: 'Admin', description: 'access to everything' },
  { name: 'Translator', description: 'edit translations' },
]

export const systemAndLocalRoles = [
  { name: 'Doctor' },
  { name: 'Nurse' },
  { name: 'Pharmacist' },
  { name: 'PharmacyAdmin' },
  { name: 'Registrar' },
  { name: 'Billing' },
  { name: 'BillingAdmin' },
  { name: 'Study', hidden: true },
  { name: 'Pending' },
  { name: 'ExternalReporting' },
  { name: 'ExternalReportingAdmin' },
]

export const systemRoles = [
  {
    name: 'SystemAdmin',
    description: 'access to everything in a health system and modify user roles for that system.',
  },
].concat(systemAndLocalRoles)

export const localRoles = [
  {
    name: 'LocalAdmin',
    description:
      'access to everything in a single location in a health system and modify user roles for that location.',
  },
].concat(systemAndLocalRoles)

//
// Validation
//

const validGlobalRoles = globalRoles.map(R => R.name)
const validSystemRoles = systemRoles.map(R => R.name)
const validLocalRoles = localRoles.map(R => R.name)
const validObjectId = /^[0-9a-fA-F]{24}$/

function validateLocalPermissions(localPermissions) {
  // Check roles
  if (Array.isArray(localPermissions)) {
    localPermissions.forEach(r => {
      if (validLocalRoles.indexOf(r) === -1) throw new Error(`Invalid local role ${r}`)
    })
  } else {
    throw new Error('Local permissions must be an array')
  }
}

function validateSystemPermissions(systemPermissions) {
  // Check keys
  Object.keys(systemPermissions).forEach(k => {
    if (!(k === 'roles' || validObjectId.test(k))) throw new Error(`Invalid system key ${k}`)
  })
  // Check roles
  if (systemPermissions.roles) {
    if (Array.isArray(systemPermissions.roles)) {
      systemPermissions.roles.forEach(r => {
        if (validSystemRoles.indexOf(r) === -1) throw new Error(`Invalid system role ${r}`)
      })
    } else {
      throw new Error('System roles must be an array')
    }
  }
  // Check locals
  Object.keys(systemPermissions).forEach(k => {
    if (k !== 'roles') validateLocalPermissions(systemPermissions[k])
  })
}

/**
 * Validates a permissions object. Returns true on success and throws an Error
 * if permissions fails check.
 */
export function validatePermissions(permissions) {
  // Check keys
  Object.keys(permissions).forEach(k => {
    if (!(k === 'roles' || validObjectId.test(k))) throw new Error(`Invalid global key ${k}`)
  })
  // Check roles
  if (permissions.roles) {
    if (Array.isArray(permissions.roles)) {
      permissions.roles.forEach(r => {
        if (validGlobalRoles.indexOf(r) === -1) throw new Error(`Invalid global role ${r}`)
      })
    } else {
      throw new Error('Global roles must be an array')
    }
  }
  // Check systems
  Object.keys(permissions).forEach(k => {
    if (k !== 'roles') validateSystemPermissions(permissions[k])
  })
}

/**
 * Validates a permissions object and provides functions to check and modify permissions.
 */
export class Permissions {
  /**
   * @permissions is either a javascript object or a JSON encoded string.
   */
  constructor(permissions = {}) {
    this.permissions =
      permissions !== null && typeof permissions === 'object'
        ? permissions
        : JSON.parse(permissions || '{}')
    validatePermissions(this.permissions)
  }
  /**
   * Returns a long-format representation of permissions which is an array of roles in
   * the following format, suitable for use in a mongo index:
   * [
   *   { type: 'Global', role: 'Admin' },
   *   { type: 'Global', role: 'Translator' },
   *   { type: 'System', role: 'Doctor', system: '123456789012345678901234' },
   *   { type: 'Local', role: 'Doctor', system: '123456789012345678901234', location: '123456789012345678901234' }
   * ]
   */
  longFormat() {
    validatePermissions(this.permissions)
    const result = []
    Object.keys(this.permissions).forEach(system => {
      if (system === 'roles') {
        this.permissions.roles.forEach(role => result.push({ type: 'Global', role }))
      } else {
        Object.keys(this.permissions[system]).forEach(location => {
          if (location === 'roles') {
            this.permissions[system].roles.forEach(role =>
              result.push({ type: 'System', role, system })
            )
          } else {
            this.permissions[system][location].forEach(role =>
              result.push({ type: 'Local', role, system, location })
            )
          }
        })
      }
    })
    return result
  }
  /**
   * Returns a list of system ids.
   */
  getSystemIDs() {
    validatePermissions(this.permissions)
    return Object.keys(this.permissions).filter(system => system !== 'roles')
  }
  /**
   * Returns a list of location ids.
   */
  getLocationIDs() {
    validatePermissions(this.permissions)
    const locationIDs = []
    this.getSystemIDs().forEach(id =>
      locationIDs.push(
        ...Object.keys(this.permissions[id]).filter(location => location !== 'roles')
      )
    )
    return locationIDs
  }
  /**
   * Serializes the permissions object to a string. Throws an Error if the permissions
   * object is invalid.
   */
  toString() {
    validatePermissions(this.permissions)
    return JSON.stringify(this.permissions)
  }
  /**
   * Adds a global role, mutating this permissions object.
   */
  addGlobalRole(role) {
    if (validGlobalRoles.indexOf(role) === -1) throw new Error(`Invalid global role ${role}`)
    if (!this.permissions.roles) this.permissions.roles = [role]
    else if (this.permissions.roles.indexOf(role) === -1) this.permissions.roles.push(role)
  }
  /**
   * Removes a global role, mutating this permissions object.
   */
  removeGlobalRole(role) {
    if (this.permissions.roles) {
      const ix = this.permissions.roles.indexOf(role)
      if (ix !== -1) this.permissions.roles.splice(ix, 1)
      if (this.permissions.roles.length === 0) delete this.permissions.roles
    }
  }
  /**
   * Adds a system role, mutating this permissions object.
   */
  addSystemRole(role, system) {
    if (!validObjectId.test(system)) throw new Error(`Invalid system ${system}`)
    if (validSystemRoles.indexOf(role) === -1) throw new Error(`Invalid system role ${role}`)
    if (!this.permissions[system]) this.permissions[system] = { roles: [role] }
    else if (!this.permissions[system].roles) this.permissions[system].roles = [role]
    else if (this.permissions[system].roles.indexOf(role) === -1)
      this.permissions[system].roles.push(role)
  }
  /**
   * Removes a system role, mutating this permissions object.
   */
  removeSystemRole(role, system) {
    if (this.permissions[system] && this.permissions[system].roles) {
      const ix = this.permissions[system].roles.indexOf(role)
      if (ix !== -1) this.permissions[system].roles.splice(ix, 1)
      if (this.permissions[system].roles.length === 0) delete this.permissions[system].roles
      if (Object.keys(this.permissions[system]).length === 0) delete this.permissions[system]
    }
  }
  /**
   * Adds a local role, mutating this permissions object.
   */
  addLocalRole(role, system, location) {
    if (!validObjectId.test(system)) throw new Error(`Invalid system ${system}`)
    if (!validObjectId.test(location)) throw new Error(`Invalid location ${location}`)
    if (validLocalRoles.indexOf(role) === -1) throw new Error(`Invalid local role ${role}`)
    if (!this.permissions[system]) this.permissions[system] = { [location]: [role] }
    else if (!this.permissions[system][location]) this.permissions[system][location] = [role]
    else if (this.permissions[system][location].indexOf(role) === -1)
      this.permissions[system][location].push(role)
  }
  /**
   * Removes a local role, mutating this permissions object. The system and location parameters
   * defaults to the system and local context from the constructor.
   */
  removeLocalRole(role, system, location) {
    if (this.permissions[system] && this.permissions[system][location]) {
      const ix = this.permissions[system][location].indexOf(role)
      if (ix !== -1) this.permissions[system][location].splice(ix, 1)
      if (this.permissions[system][location].length === 0) delete this.permissions[system][location]
      if (Object.keys(this.permissions[system]).length === 0) delete this.permissions[system]
    }
  }
  /**
   * Accepts any role (global, system or location) and returns true if user has the role
   * in any context. @system and @location are optional.
   */
  hasRole(role, system, location) {
    return (
      this.hasGlobalRole(role) ||
      (system && this.hasSystemRole(role, system)) ||
      (system && location && this.hasLocalRole(role, system, location))
    )
  }

  /**
   * Returns true if the user has the given global role.
   */
  hasGlobalRole(role) {
    return (
      validGlobalRoles.indexOf(role) !== -1 &&
      this.permissions.roles &&
      this.permissions.roles.indexOf(role) !== -1
    )
  }
  /**
   * Returns true if the user has any role in the given system.
   */
  hasAnySystemRole(system) {
    if (!system) return false
    if (!validObjectId.test(system)) throw new Error(`Invalid system ${system}`)
    return (
      this.permissions[system] &&
      this.permissions[system].roles &&
      this.permissions[system].roles.length > 0
    )
  }
  /**
   * Returns true if the user has the given role in the system.
   */
  hasSystemRole(role, system) {
    if (!validObjectId.test(system)) throw new Error(`Invalid system ${system}`)
    return (
      validSystemRoles.indexOf(role) !== -1 &&
      this.permissions[system] &&
      this.permissions[system].roles &&
      this.permissions[system].roles.indexOf(role) !== -1
    )
  }
  /**
   * Returns true if the user has the given role in any system.
   */
  hasRoleInAnySystem(role) {
    return this.getSystemIDs().some(system => this.hasSystemRole(role, system))
  }
  /**
   * Returns true if the user has any role in the system -> location context.
   */
  hasAnyLocalRole(system, location) {
    if (!system || !location) return false
    if (!validObjectId.test(system)) throw new Error(`Invalid system ${system}`)
    if (!validObjectId.test(location)) throw new Error(`Invalid location ${location}`)
    return (
      this.permissions[system] &&
      this.permissions[system][location] &&
      this.permissions[system][location].length > 0
    )
  }
  /**
   * Returns true if the user has the given role in the system -> location context.
   */
  hasLocalRole(role, system, location) {
    if (!validObjectId.test(system)) throw new Error(`Invalid system ${system}`)
    if (!validObjectId.test(location)) throw new Error(`Invalid location ${location}`)
    /*
    debug({
      'validLocalRoles.indexOf(role) !== -1': validLocalRoles.indexOf(role) !== -1,
      'this.permissions[system]': this.permissions[system],
      'this.permissions[system][location]': this.permissions[system][location],
      'this.permissions[system][location].indexOf(role) !== -1': this.permissions[system][location].indexOf(role) !== -1
    })
    */
    return (
      validLocalRoles.indexOf(role) !== -1 &&
      this.permissions[system] &&
      this.permissions[system][location] &&
      this.permissions[system][location].indexOf(role) !== -1
    )
  }
  /**
   * Returns true if the user has the given role in any location.
   */
  hasRoleInAnyLocation(role) {
    return this.getSystemIDs().some(system =>
      this.getLocationIDs().some(location => this.hasLocalRole(role, system, location))
    )
  }
}

debug('loaded')
