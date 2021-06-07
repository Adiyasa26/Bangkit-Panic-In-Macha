const { RegisterNewUser, loginUser } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/users',
    handler: RegisterNewUser,
  },

  {
    method: 'POST',
    path: '/users/login',
    handler: loginUser,
  },
];

module.exports = routes;
