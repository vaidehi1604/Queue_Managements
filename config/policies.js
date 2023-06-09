/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,

  TicketsController: {
    //change processed ticket and also update unprocess ticket
    "updateTickets": "isAdmin",
    "getTicket": "isAdmin",
    "adminfind":"isAdmin",
    "getPlaceTicket":"isAdmin",
    "*": "userLoggedIn",
  },
  PlaceController: {
    "addPlace": "isAdmin",
    "updatePlace": "isAdmin",
    "deletePlace": "isAdmin",
    "getPlace":"isLoggedIn"
  },

  UserController: {
    "userLogout": "isLoggedIn",
    "*": true,
  },
};
