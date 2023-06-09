/**
 * Place.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    place: {
      type: "string",
      required: true,
      unique: true,
    },
    unprocessTicket: {
      type: "number",
      defaultsTo: 0,
    },
    prefix: {
      type: "string",
      unique: true,
    },
    tickets: {
      collection: "tickets",
      via: "placeId"
    },
  },
};
