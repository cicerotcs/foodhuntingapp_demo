const client = require("../db/connect");

const isAuthenticated = (req, res, next) => {
  if (req.session.authorized) {
    next();
  } else {
    res.redirect("/signin");
  }
};

async function getUser(req, res, next) {
  const { authorized } = req.session;
  res.locals.user = {};
  if (authorized) {
    let sql = "select email from users where id=$1";
    const dbRes = await client.query(sql, [req.session.userId]);
    if (dbRes.rowCount === 1) {
      res.locals.user = dbRes.rows[0]; //locals
      next();
    }
  } else {
    next();
  }
}

// function isLoggedIn(req, res, next){
//     res.locals.isLogged = () => {

//     }
// }

module.exports = { isAuthenticated, getUser };
