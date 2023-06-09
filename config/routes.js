/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //place routes
  'POST /admin/place': 'PlaceController.addPlace',
  'DELETE /place/delete/:id': 'PlaceController.deletePlace',
  'PATCH /place/update/:id': 'PlaceController.updatePlace',
  'GET /place/get':'PlaceController.getPlace',

  //Ticket routes
  'POST /addticket/:placeId': 'TicketsController.addTickets',
  'GET /ticket/show': 'TicketsController.getTicket',

  //User routes
  'POST /user/signup': 'UserController.userSignup',
  'POST /user/login': 'UserController.userLogin',
  'POST /user/logout': 'UserController.userLogout',
  'GET /user/ticket': 'TicketsController.userfind',
  //Admin
  'GET /admin/ticket': 'TicketsController.adminfind',
  'GET /admin/place/:placeId': 'TicketsController.getPlaceTicket',
  'PATCH /ticket/:id': 'TicketsController.updateTickets',
};
