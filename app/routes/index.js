const roleRoutes = require('./role_routes');
const userRoutes = require('./user_routes');
const loginRoutes = require('./login_routes');
const sessionRoutes = require('./session_routes');



module.exports = function(app, db) {
  roleRoutes(app, db);
  userRoutes(app, db);
  sessionRoutes(app, db);
  loginRoutes(app, db);
  // Other route groups could go here, in the future
};