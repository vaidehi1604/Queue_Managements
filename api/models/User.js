/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { roles } = sails.config.constants;

module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      isEmail: true,
      unique: true,
    },

    password: {
      type:'string',
      required: true,
    },
    role: {
      type: 'string',
      isIn: [roles.user, roles.admin],
      defaultsTo: roles.user,
    },
  },
};
